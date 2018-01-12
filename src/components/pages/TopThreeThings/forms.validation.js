import { valuesNames } from './forms.config';

const validateForm = (values) => {
  const errors = {};
  errors[valuesNames.NAME] = !values[valuesNames.NAME] ? 'You must enter a value.' : null;
  errors[valuesNames.DESCRIPTION] = !values[valuesNames.DESCRIPTION] ? 'You must enter a value.' : null;
  return errors
};

export { validateForm }
