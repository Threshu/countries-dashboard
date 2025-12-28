/**
 * Validation rules for form inputs
 * Compatible with Vuetify v-form validation
 * @returns Object with validation rule functions
 */
export function useValidation () {
  const rules={
    /**
     * Validates that a field is not empty
     * @param value - Value to validate
     * @returns Error message or true if valid
     */
    required: (value: string|number|null|undefined): string|true => {
      if(value===null||value===undefined||value==='') {
        return 'This field is required';
      }
      return true;
    },

    /**
     * Validates that a number is greater than or equal to minimum
     * @param min - Minimum allowed value
     * @returns Validation function
     */
    minValue: (min: number) => {
      return (value: number|string|null|undefined): string|true => {
        if(value===null||value===undefined||value==='') {
          return true;
        }

        const numValue=typeof value==='string'? parseFloat(value):value;

        if(isNaN(numValue)) {
          return 'Must be a valid number';
        }

        if(numValue<min) {
          return `Must be at least ${min}`;
        }

        return true;
      };
    },

    /**
     * Validates that a number is less than or equal to maximum
     * @param max - Maximum allowed value
     * @returns Validation function
     */
    maxValue: (max: number) => {
      return (value: number|string|null|undefined): string|true => {
        if(value===null||value===undefined||value==='') {
          return true;
        }

        const numValue=typeof value==='string'? parseFloat(value):value;

        if(isNaN(numValue)) {
          return 'Must be a valid number';
        }

        if(numValue>max) {
          return `Must be at most ${max}`;
        }

        return true;
      };
    },
  };

  return { rules };
}
