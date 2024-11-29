import axios from 'axios';
import { fetchColors } from '../src/app/lib/fetchColors';

jest.mock('axios');

describe('fetchColors', () => {
  it('deve retornar a lista de cores do GitHub', async () => {
    const mockColors = [{ name: 'JavaScript', color: '#f1e05a' }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockColors });

    const colors = await fetchColors();

    expect(axios.get).toHaveBeenCalledWith('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
    expect(colors).toEqual(mockColors);
  });
});
