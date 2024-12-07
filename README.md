
# LuckyLotto  
**Seamless Blockchain-Powered Betting for Gamers**  

LuckyLotto is a decentralized betting platform that leverages blockchain technology to provide a seamless and transparent gaming experience. Gamers can engage in exciting games like dice rolling, coin flip, and wheel spin, powered by smart contracts to ensure fairness and immutability.

<img width="1433" alt="Screenshot 2024-12-08 at 04 49 23" src="https://github.com/user-attachments/assets/453f85a0-956c-4d7a-9bbd-4b6111cddf3d">

## Table of Contents  
- [Description](#description)  
- [Features](#features)  
- [Installation](#installation)  
- [Frontend Interaction](#frontend-interaction)  
- [Smart Contracts](#smart-contracts)  
- [Supported Games](#supported-games)  
- [Contributing](#contributing)  
- [License](#license)

## Description  
LuckyLotto is designed to bring transparency and excitement to online betting. By utilizing blockchain smart contracts, LuckyLotto guarantees secure and fair gameplay. The platform enables players to participate in various games, place bets, and instantly verify results—all within a decentralized environment.

<img width="1434" alt="Screenshot 2024-12-08 at 04 49 47" src="https://github.com/user-attachments/assets/1b135708-f699-4c6b-9dab-f7362ce64a79">

## Features  
- **Decentralized Betting:** Fully transparent and immutable, ensuring a fair gaming experience.  
- **Multiple Game Types:** Choose from dice rolling, coin flip, and wheel spin, with more games coming soon.  
- **Smart Contract Powered:** Game logic and payouts are handled securely on the blockchain.  
- **Seamless Integration:** Easy-to-use frontend for interacting with the contracts.  

## Installation  

### Prerequisites  
- **Next.js**
- **Node.js**
- **Hardhat**

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/rajeebkm/luckylotto.git  
   cd luckylotto  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Compile smart contracts:  
   ```bash  
   npx hardhat compile  
   ```  

4. Deploy the contracts to your desired network:  
   ```bash  
   npx hardhat run scripts/deploy.js --network <network_name>  
   ```  

5. Update the frontend with the deployed contract addresses (e.g., in a `app/utils/constant.ts` file).
   
<img width="1422" alt="Screenshot 2024-12-08 at 04 50 17" src="https://github.com/user-attachments/assets/eae5aab1-ed66-4351-a417-2fd2a0245389">

## Frontend Interaction  
LuckyLotto offers an intuitive user interface where players can:  
1. Connect their blockchain wallet (e.g., Metamask).  
2. Select a game type from the options (dice rolling, coin flip, or wheel spin etc.).  
3. Place their bet and confirm the transaction.  
4. View results and claim winnings, if any.  

To run the frontend locally:  
1. Navigate to the frontend directory:  
   ```bash  
   cd frontend  
   ```  
2. Start the development server:  
   ```bash  
   npm start  
   ```  
3. Open your browser and navigate to `http://localhost:3000`.  

## Smart Contracts  
The smart contracts are written in Solidity and handle the following functionalities:  
- Game mechanics (dice rolls, coin flips, wheel spins).  
- Bet placements and payouts.  
- Ensuring transparency and fairness through on-chain randomness.  

Contracts are located in the `contracts` directory. Key files include:  
- `LuckyDiceRoll.sol`  

## Supported Games  
1. **Dice Rolling:** Roll a dice to predict the outcome and win if your prediction is correct.  
2. **Coin Flip:** Bet on heads or tails and test your luck!  
3. **Wheel Spin:** Spin the wheel for a chance to win big payouts.  

More games will be added soon to enhance the platform's versatility.

## Contributing  
Contributions are welcome! To get started:  
1. Fork the repository.  
2. Create a feature branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Add feature description"  
   ```  
4. Push to your fork:  
   ```bash  
   git push origin feature-name  
   ```  
5. Create a pull request.
