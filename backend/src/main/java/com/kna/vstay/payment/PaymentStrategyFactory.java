package com.kna.vstay.payment;

import com.kna.vstay.exception.ValidationException;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class PaymentStrategyFactory {
    private final Map<String, PaymentStrategy> strategies;

    public PaymentStrategyFactory(List<PaymentStrategy> strategies) {
        this.strategies = strategies.stream()
                .collect(Collectors.toUnmodifiableMap(strategy -> strategy.provider().toUpperCase(Locale.ROOT),
                        Function.identity()));
    }

    public PaymentStrategy getStrategy(String provider) {
        if (provider == null || provider.isBlank()) {
            throw new ValidationException("Payment provider is required.");
        }
        PaymentStrategy strategy = strategies.get(provider.toUpperCase(Locale.ROOT));
        if (strategy == null) {
            throw new ValidationException("Unsupported payment provider: " + provider + ".");
        }
        return strategy;
    }
}
