import { useState } from 'react';

const useRegisterFormStep = (initialStep) => useState(initialStep);
const useRegisterFormSavedFields = (fn) => useState(fn);

export { useRegisterFormStep, useRegisterFormSavedFields };
