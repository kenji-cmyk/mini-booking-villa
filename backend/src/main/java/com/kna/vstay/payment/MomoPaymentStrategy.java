package com.kna.vstay.payment;

import com.kna.vstay.dto.PaymentRequest;
import com.kna.vstay.enums.PaymentStatus;
import org.springframework.stereotype.Component;

@Component
public class MomoPaymentStrategy implements PaymentStrategy {
    @Override
    public String provider() {
        return "MOMO";
    }

    @Override
    public PaymentStatus process(PaymentRequest request) {
        if (request.successful() == null) {
            return PaymentStatus.PENDING;
        }
        return Boolean.TRUE.equals(request.successful()) ? PaymentStatus.SUCCESSFUL : PaymentStatus.FAILED;
    }
}
