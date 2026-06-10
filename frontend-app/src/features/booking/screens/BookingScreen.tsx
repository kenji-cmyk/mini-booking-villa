import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { createBooking } from "@/features/booking/services/bookingService";
import type { BookingRequest } from "@/features/booking/types/booking";
import { AppButton } from "@/shared/components/AppButton";
import { AppInput } from "@/shared/components/AppInput";
import { Screen } from "@/shared/components/Screen";
import { getErrorMessage } from "@/shared/lib/errors";

const initialForm: BookingRequest = {
  villaId: 1,
  checkInDate: "2026-08-01",
  checkOutDate: "2026-08-03",
  numberOfGuests: 2,
  contactName: "Demo Guest",
  contactPhone: "0900000001"
};

export function BookingScreen() {
  const [form, setForm] = useState<BookingRequest>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingRequest, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async () => {
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = await createBooking(form);
      Alert.alert("Booking created", `Booking #${booking.id} is ${booking.bookingStatus}.`);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      Alert.alert("Booking failed", getErrorMessage(error, "Unable to create booking."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <View className="mb-6 gap-2">
        <Text className="text-3xl font-bold text-ocean-900">Create booking</Text>
        <Text className="text-base text-neutral-700">Your stay details are checked before they are sent to VStay.</Text>
      </View>

      <View className="gap-4">
        <AppInput
          error={errors.villaId}
          keyboardType="number-pad"
          label="Villa ID"
          onChangeText={(value) => updateForm("villaId", Number(value) || 0)}
          placeholder="1"
          value={String(form.villaId)}
        />
        <AppInput
          error={errors.checkInDate}
          helperText="Use YYYY-MM-DD."
          label="Check-in date"
          onChangeText={(value) => updateForm("checkInDate", value)}
          placeholder="2026-08-01"
          value={form.checkInDate}
        />
        <AppInput
          error={errors.checkOutDate}
          helperText="Use YYYY-MM-DD."
          label="Check-out date"
          onChangeText={(value) => updateForm("checkOutDate", value)}
          placeholder="2026-08-03"
          value={form.checkOutDate}
        />
        <AppInput
          error={errors.numberOfGuests}
          keyboardType="number-pad"
          label="Guests"
          onChangeText={(value) => updateForm("numberOfGuests", Number(value) || 0)}
          placeholder="2"
          value={String(form.numberOfGuests)}
        />
        <AppInput
          error={errors.contactName}
          label="Contact name"
          onChangeText={(value) => updateForm("contactName", value)}
          placeholder="Nguyen Van A"
          value={form.contactName}
        />
        <AppInput
          error={errors.contactPhone}
          keyboardType="phone-pad"
          label="Contact phone"
          onChangeText={(value) => updateForm("contactPhone", value)}
          placeholder="0901234567"
          value={form.contactPhone}
        />
        <AppButton isLoading={isSubmitting} onPress={submit}>
          Submit booking
        </AppButton>
      </View>
    </Screen>
  );
}

function validateBooking(form: BookingRequest): Partial<Record<keyof BookingRequest, string>> {
  const errors: Partial<Record<keyof BookingRequest, string>> = {};

  if (!form.villaId) {
    errors.villaId = "Villa ID is required.";
  }

  if (!isDateString(form.checkInDate)) {
    errors.checkInDate = "Enter a valid check-in date.";
  }

  if (!isDateString(form.checkOutDate)) {
    errors.checkOutDate = "Enter a valid check-out date.";
  }

  if (isDateString(form.checkInDate) && isDateString(form.checkOutDate) && form.checkOutDate <= form.checkInDate) {
    errors.checkOutDate = "Check-out must be later than check-in.";
  }

  if (form.numberOfGuests <= 0) {
    errors.numberOfGuests = "Guests must be greater than 0.";
  }

  if (!form.contactName.trim()) {
    errors.contactName = "Contact name is required.";
  }

  if (!form.contactPhone.trim()) {
    errors.contactPhone = "Contact phone is required.";
  }

  return errors;
}

function isDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
