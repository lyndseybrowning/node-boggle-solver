import utils from './utils';

export default function findAdjacents(position, size, filter = []) {
  	const directions = [ [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1] ];
    const allDirections = directions.slice(0);
    const [row,col] = position;

    return allDirections.reduce((adjacents, direction) => {
      const [x, y] = direction;
      const rowSum = (x < 0) ? row - Math.abs(x) : row + x;
      const colSum = (y < 0) ? col - Math.abs(y) : col + y;

      const validPosition = (rowSum >= 0 && colSum >= 0);
      const validSize = (rowSum < size && colSum < size);

      if (validPosition && validSize) {
        const adjacent = [rowSum, colSum];

        if (!utils.arrayMatch(filter, adjacent)) {
          adjacents.push(adjacent);
        }
      }
      
      return adjacents;
    }, []);
}
