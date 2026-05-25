package com.kna.vstay.payment;

import com.kna.vstay.dto.PaymentRequest;
import com.kna.vstay.enums.PaymentStatus;
import org.springframework.stereotype.Component;

@Component
public class VNPayPaymentStrategy implements PaymentStrategy {
    @Override
    public String provider() {
        return "VNPAY";
    }

    @Override
    public PaymentStatus process(PaymentRequest request) {
        return Boolean.FALSE.equals(request.successful()) ? PaymentStatus.FAILED : PaymentStatus.SUCCESSFUL;
    }
}
