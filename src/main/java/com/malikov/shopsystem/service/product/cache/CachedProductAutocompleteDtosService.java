package com.malikov.shopsystem.service.product.cache;

import com.google.common.collect.Streams;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class CachedProductAutocompleteDtosService {

    protected static final String PRODUCT_AUTOCOMPLETE_DTOS_CACHE = "allProductAutocompleteDtos";
    private static final int FIVE_MINUTES = 5 * 60 * 1000;

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CacheManager cacheManager;

    public CachedProductAutocompleteDtosService(ProductRepository productRepository,
                                                ProductMapper productMapper,
                                                CacheManager cacheManager) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.cacheManager = cacheManager;
    }

    public List<ProductAutocompleteDto> getByProductNameMask(String productNameMask) {
        return getAllCachedProductElements()
                .filter(cacheElement -> ((String) cacheElement.getObjectKey()).contains(format(productNameMask)))
                .map(cacheElement -> (ProductAutocompleteDto) cacheElement.getObjectValue())
                .sorted(Comparator.comparing(ProductAutocompleteDto::getLabel))
                .collect(Collectors.toList());
    }

    private Stream<Element> getAllCachedProductElements() {
        Ehcache allProductAutocompleteDtosCache = allProductAutocompleteDtosCache();
        return allProductAutocompleteDtosCache
                .getAll(allProductAutocompleteDtosCache.getKeys())
                .values()
                .stream();
    }

    private Ehcache allProductAutocompleteDtosCache() {
        return cacheManager.getEhcache(PRODUCT_AUTOCOMPLETE_DTOS_CACHE);
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
        allProductAutocompleteDtosCache().putAll(queriedProductAutocompleteDtos);
    }

    private List<ProductAutocompleteDto> findAllProductAutocompleteDtos() {
        return Streams.stream(productRepository.findAll())
                .map(this::toAutocompleteDto)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    private void retainInCache(Set queriedDtoKeys) {
        Ehcache allProductAutocompleteDtosCache = allProductAutocompleteDtosCache();
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
