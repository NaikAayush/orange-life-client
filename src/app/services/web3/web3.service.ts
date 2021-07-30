import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  constructor() {
    const web3 = new Web3('http://localhost:8545');
  }
}
