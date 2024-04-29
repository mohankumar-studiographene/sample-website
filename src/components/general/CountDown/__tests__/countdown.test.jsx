// import { act, fireEvent, render } from '@testing-library/react';

// import CountDown from '..';

// const mockHandleFunction = jest.fn();

// describe('CountDown Component', () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//   });

//   afterEach(() => {
//     jest.clearAllTimers();
//     mockHandleFunction.mockClear();
//   });

//   it('renders as a button with initial text', () => {
//     const { getByText } = render(
//       <CountDown text="Start" seconds={10} handleFunction={mockHandleFunction} />,
//     );
//     const buttonElement = getByText('Start');
//     expect(buttonElement).toBeInTheDocument();
//   });

//   it('calls handleFunction when button is clicked', () => {
//     const { getByText } = render(
//       <CountDown text="Start" seconds={10} handleFunction={mockHandleFunction} />,
//     );
//     const buttonElement = getByText('Start');
//     fireEvent.click(buttonElement);
//     expect(mockHandleFunction).toHaveBeenCalled();
//   });

//   it('displays countdown when button is clicked', () => {
//     const { getByText } = render(
//       <CountDown text="Start" seconds={5} handleFunction={mockHandleFunction} />,
//     );
//     const buttonElement = getByText('Start');
//     fireEvent.click(buttonElement);
//     expect(buttonElement.textContent).toBe('Start (5)');
//   });

//   it('resets countdown and button state after time elapses', async () => {
//     const { getByText } = render(
//       <CountDown text="Start" seconds={2} handleFunction={mockHandleFunction} />,
//     );
//     const buttonElement = getByText('Start');
//     fireEvent.click(buttonElement);
//     act(() => {
//       jest.advanceTimersByTime(2000);
//     });
//     expect(buttonElement.textContent).toBe('Start');
//     expect(mockHandleFunction).toHaveBeenCalledTimes(1);
//   });
// });
import { act, fireEvent, render, screen } from '@testing-library/react';

import CountDown from '..';

describe('CountDown component', () => {
  const mockHandleFunction = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    mockHandleFunction.mockClear();
  });

  it('renders a button with the provided text', () => {
    const text = 'Start';
    const handleFunction = jest.fn();
    render(<CountDown text={text} seconds={10} handleFunction={handleFunction} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });

  it('disables the button when clicked and shows the countdown', () => {
    const text = 'Start';
    const seconds = 5;
    const handleFunction = jest.fn();
    render(<CountDown text={text} seconds={seconds} handleFunction={handleFunction} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(`${text} (${seconds})`);
  });

  it('calls the provided function when the button is clicked', () => {
    const handleFunction = jest.fn();
    render(<CountDown text="Start" seconds={10} handleFunction={handleFunction} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleFunction).toHaveBeenCalledTimes(1);
  });

  it('resets countdown and button state after time elapses', async () => {
    const handleFunction = jest.fn();
    const { getByText } = render(
      <CountDown text="Start" seconds={2} handleFunction={handleFunction} />,
    );
    const buttonElement = getByText('Start');
    fireEvent.click(buttonElement);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(buttonElement.textContent).toBe('Start');
    expect(handleFunction).toHaveBeenCalledTimes(1);
  });
});
