package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Currency;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

/**
 * @author Yurii Malikov
 */
public interface CurrencyRepository extends CrudRepository<Currency, BigInteger> {

}
