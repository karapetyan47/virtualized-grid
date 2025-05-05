import { screen, fireEvent } from '@testing-library/react';

import { DetailedPhotoView } from '../detailed-photo-view';

import { C_MockPhoto } from '@/test/mocks/photos';
import { renderWithProviders } from '@/test/utils/render-with-providers';

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
}));

describe('DetailedPhotoView', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading prop is true', () => {
    renderWithProviders(<DetailedPhotoView onBack={mockOnBack} loading={true} />);

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.getByText('Back to Gallery')).toBeInTheDocument();
  });

  it('renders loading state when photo is null', () => {
    renderWithProviders(<DetailedPhotoView onBack={mockOnBack} photo={null} />);

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
  });

  it('renders photo details when photo is provided and not loading', () => {
    renderWithProviders(<DetailedPhotoView photo={C_MockPhoto} onBack={mockOnBack} />);

    expect(screen.getByText(C_MockPhoto.alt)).toBeInTheDocument();
    expect(screen.getByText(C_MockPhoto.photographer)).toBeInTheDocument();
    expect(screen.getByText(`${C_MockPhoto.width} × ${C_MockPhoto.height}`)).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    renderWithProviders(<DetailedPhotoView photo={C_MockPhoto} onBack={mockOnBack} />);

    const backButton = screen.getByTestId('arrow-left-icon');
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays "Back to Gallery" text in back button', () => {
    renderWithProviders(<DetailedPhotoView photo={C_MockPhoto} onBack={mockOnBack} />);

    expect(screen.getByText('Back to Gallery')).toBeInTheDocument();
  });

  it('includes arrow icon in back button', () => {
    renderWithProviders(<DetailedPhotoView photo={C_MockPhoto} onBack={mockOnBack} />);

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
  });
});
