import { useState } from 'react';

const useRegisterFormStep = (initialStep) => useState(initialStep);
const useRegisterFormSavedFields = (fn) => useState(fn);
const useIsOtpTimerRunning = (initialValue) => useState(initialValue);

export { useRegisterFormStep, useRegisterFormSavedFields, useIsOtpTimerRunning };
