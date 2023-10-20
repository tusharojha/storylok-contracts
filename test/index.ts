import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';

describe('Storylok contract', function () {
  let storylok: any;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const StorylokFactory = await ethers.getContractFactory('Storylok');
    storylok = await StorylokFactory.deploy();
  });

  it('Should deploy with correct name and symbol', async function () {
    expect(await storylok.name()).to.equal('Storylok');
    expect(await storylok.symbol()).to.equal('SL');
  });

  it('Should mint NFTs correctly', async function () {
    const initialTokenCount = await storylok.totalSupply();

    await storylok.safeMint(await addr1.getAddress(), 'token-uri');

    const newTokenCount = await storylok.totalSupply();
    const d = BigInt(1)
    expect(newTokenCount).to.equal(initialTokenCount + d);

    const ownerOfNewToken = await storylok.ownerOf(1);
    expect(ownerOfNewToken).to.equal(await addr1.getAddress());

    const tokenUri = await storylok.tokenURI(1);
    expect(tokenUri).to.equal('ipfs://token-uri');
  });

  it('Should not allow minting by non-owners', async function () {
    await expect(storylok.connect(addr1).safeMint(await addr1.getAddress(), 'ipfs://token-uri')).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
  });
});