export const IERC20 = [
  "function symbol() external view returns (string memory)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address recipient, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
];

export const ISwapPair = [
  "function balanceOf(address owner) external view returns (uint)",
  "function factory() external view returns (address)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out,uint amount1Out, address indexed to)",
];

export const ISwapRouter = [
  "function factory() external pure returns (address)",
  "function WETH() external pure returns (address)",
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
  "function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)",
  "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
  // 'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)',
  // 'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)',
  // 'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  // 'function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  // 'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  // 'function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  // 'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  // 'function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  // 'function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB)',
  // 'function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut)',
  // 'function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn)',
  // 'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  // 'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)'
];

export const IMultiCall = [
  "function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)",
  "function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)",
  "function aggregate3Value(tuple(address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)",
  "function blockAndAggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)",
  "function getBasefee() view returns (uint256 basefee)",
  "function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)",
  "function getBlockNumber() view returns (uint256 blockNumber)",
  "function getChainId() view returns (uint256 chainid)",
  "function getCurrentBlockCoinbase() view returns (address coinbase)",
  "function getCurrentBlockDifficulty() view returns (uint256 difficulty)",
  "function getCurrentBlockGasLimit() view returns (uint256 gaslimit)",
  "function getCurrentBlockTimestamp() view returns (uint256 timestamp)",
  "function getEthBalance(address addr) view returns (uint256 balance)",
  "function getLastBlockHash() view returns (bytes32 blockHash)",
  "function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)",
  "function tryBlockAndAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)",
];
