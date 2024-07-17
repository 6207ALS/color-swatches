import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import HSLForm from '../components/HSLForm';

let handleGetColorsMock;
let handleSaturationChangeMock;
let handleLightChangeMock;

// Return boolean indicating if input value is valid integer
const isValidInput = (value, start = 0, end = 100) => {
  return value.trim() &&
    !isNaN(value) &&
    Number(value) >= start &&
    Number(value) <= end &&
    String(parseInt(value)) === value;
}

// Render HSL Form component with mock functions
const renderFormComponent = (validationError = null) => {
  render(
    <HSLForm
      colorState={{ validationError }}
      handleGetColors={handleGetColorsMock}
      handleSaturationChange={handleSaturationChangeMock}
      handleLightChange={handleLightChangeMock}
      validateInputs={() => {
        const saturation = screen.getByLabelText(/saturation/i).value;
        const light = screen.getByLabelText(/light/i).value;
        return isValidInput(saturation) && isValidInput(light);
      }}
    />
  )
}

beforeEach(() => {
  handleGetColorsMock = vi.fn();
  handleSaturationChangeMock = vi.fn();
  handleLightChangeMock = vi.fn();
});

describe("handleGetColors is called when...", () => {
	it('both form inputs are valid', async () => {
	  // Render HSL Form component
	  renderFormComponent()

	  // Enter valid values to both form inputs (Saturation & Light)
	  const user = userEvent.setup();
	  await user.type(screen.getByLabelText(/saturation/i), '100');
	  await user.type(screen.getByLabelText(/light/i), '50');

	  // Submit the form
	  fireEvent.submit(screen.getByRole('button', { name: /search/i }));

	  // Expect handleGetColors to be called
	  await waitFor(() => {
	    expect(handleGetColorsMock.mock.calls.length).toBe(1);
	  });

	});

})

describe("handleGetColors is NOT called when...", () => {
	it('saturation input is invalid', async () => {
	  // Render HSL Form component
	  renderFormComponent()

	  // Enter valid values to both form inputs (Saturation & Light)
	  const user = userEvent.setup();
	  await user.type(screen.getByLabelText(/saturation/i), 'hello');
	  await user.type(screen.getByLabelText(/light/i), '50');

	  // Submit the form
	  fireEvent.submit(screen.getByRole('button', { name: /search/i }));

	  // Expect handleGetColors to not be called
	  await waitFor(() => {
	    expect(handleGetColorsMock.mock.calls.length).toBe(0);
	  });

	});

	it('light input is invalid', async () => {
	  // Render HSL Form component
	  renderFormComponent()

	  // Enter valid values to both form inputs (Saturation & Light)
	  const user = userEvent.setup();
	  await user.type(screen.getByLabelText(/saturation/i), '100');
	  await user.type(screen.getByLabelText(/light/i), 'hello');

	  // Submit the form
	  fireEvent.submit(screen.getByRole('button', { name: /search/i }));

	  // Expect handleGetColors to not be called
	  await waitFor(() => {
	    expect(handleGetColorsMock.mock.calls.length).toBe(0);
	  });
	});
})
