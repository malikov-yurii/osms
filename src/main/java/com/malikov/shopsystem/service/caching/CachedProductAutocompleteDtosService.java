package com.malikov.shopsystem.service.caching;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static java.util.stream.Collectors.toList;

@Service
@CacheConfig(cacheNames = CachedProductAutocompleteDtosService.PRODUCT_AUTOCOMPLETE_DTOS_CACHE)
@Slf4j
public class CachedProductAutocompleteDtosService {

    protected static final String PRODUCT_AUTOCOMPLETE_DTOS_CACHE = "allProductAutocompleteDtos";
    private static final int FIVE_MINUTES = 5 * 60 * 1000;

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CacheManager cacheManager;

    private Ehcache allProductAutocompleteDtosCache;

    public CachedProductAutocompleteDtosService(ProductRepository productRepository,
                                                ProductMapper productMapper,
                                                CacheManager cacheManager) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.cacheManager = cacheManager;
    }

    @PostConstruct
    private final void init() {
        allProductAutocompleteDtosCache = cacheManager.getEhcache(PRODUCT_AUTOCOMPLETE_DTOS_CACHE);
    }

    public List<ProductAutocompleteDto> getByProductNameMask(String productNameMask) {
        return getAllCachedProductElements()
                .filter(cacheElement -> ((String) cacheElement.getObjectKey()).contains(format(productNameMask)))
                .map(cacheElement -> (ProductAutocompleteDto) cacheElement.getObjectValue())
                .collect(toList());
    }

    private Stream<Element> getAllCachedProductElements() {
        return allProductAutocompleteDtosCache.getAll(allProductAutocompleteDtosCache.getKeys()).values().stream();
    }

    private static String format(String mask) {
        return Objects.nonNull(mask)
                ? mask.replaceAll(",", StringUtils.EMPTY).toLowerCase()
                : StringUtils.EMPTY;
    }

    @Scheduled(fixedDelay = FIVE_MINUTES)
    protected void refreshCache() {
        List<Element> queriedProductAutocompleteDtos = new ArrayList<>();
        Set queriedProductKeys = new HashSet();
        findAllProductAutocompleteDtos().stream()
                .forEach(productAutocompleteDto -> {
                    String productNameWithoutCommas = format(productAutocompleteDto.getProductName());
                    queriedProductAutocompleteDtos.add(new Element(productNameWithoutCommas, productAutocompleteDto));
                    queriedProductKeys.add(productNameWithoutCommas);
                });
        retainInCache(queriedProductKeys);
        allProductAutocompleteDtosCache.putAll(queriedProductAutocompleteDtos);
    }

    private List<ProductAutocompleteDto> findAllProductAutocompleteDtos() {
        return StreamSupport.stream(productRepository.findAll().spliterator(), false)
                .map(this::toAutocompleteDto)
                .flatMap(Collection::stream)
                .collect(toList());
    }

    private void retainInCache(Set queriedDtoKeys) {
        List productsToEvictFromCache = allProductAutocompleteDtosCache.getKeys();
        productsToEvictFromCache.removeAll(queriedDtoKeys);
        allProductAutocompleteDtosCache.removeAll(productsToEvictFromCache);
    }

    private Collection<ProductAutocompleteDto> toAutocompleteDto(Product product) {
        return CollectionUtils.isNotEmpty(product.getVariations())
                ? productMapper.toAutocompleteDto(product.getVariations())
                : productMapper.toAutocompleteDtoSingleton(product);
    }

}
