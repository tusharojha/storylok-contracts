import { ethers } from "hardhat";

async function main() {
  const storylok = await ethers.deployContract("Storylok");

  await storylok.waitForDeployment();

  console.log(
    `Storylok deployed to ${storylok.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
