package com.kna.vstay.payment;

import com.kna.vstay.dto.PaymentRequest;
import com.kna.vstay.enums.PaymentStatus;

public interface PaymentStrategy {
    String provider();

    PaymentStatus process(PaymentRequest request);
}
