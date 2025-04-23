# DAO-Voting-System
This **LiveVote** application is a decentralized voting system built on a local Ethereum blockchain, designed to facilitate secure and transparent voting processes. It leverages smart contracts and blockchain technology to ensure trustless, tamper-proof voting, primarily for use in a DAO (Decentralized Autonomous Organization) context. The system allows administrators to create and manage voting proposals, generate unique QR codes for voter authentication, and track results on-chain. General users can connect their MetaMask wallets, scan QR codes to gain voting power, and cast votes securely, with all transactions recorded on the blockchain. The application features a user-friendly interface for both admins and voters, with functionalities like proposal creation, real-time status tracking (Pending, Active, Closed), and detailed result reporting, including voter turnout and option percentages.

## UI

![image](https://github.com/user-attachments/assets/b1ff8c33-9c61-46e4-849f-c690636dfeeb)

![image](https://github.com/user-attachments/assets/704a7a0d-3c72-4cf3-ba5d-b61b45748cdc)
![image](https://github.com/user-attachments/assets/91946ae0-4eb7-4aa6-a67b-456c269df32b)

![image](https://github.com/user-attachments/assets/4cbc3cee-f8f3-4f67-ac33-73c76d2bed2d)

A form for user to create a new voting title
![image](https://github.com/user-attachments/assets/43718072-70a4-4f27-80cf-594b4c66c4f8)
![image](https://github.com/user-attachments/assets/22cc8648-c426-4d25-9cb6-5bfe3871e75e)

## Installation Guide

command to run frontend

```
cd LiveVote_Frontend
npm install --force
```

or

```
cd LiveVote_Frontend
npm install --legacy-peer-deps

```

As noted, the Node.js version installed on the running machine must be 20.17 or 20.18.

Redirect the current working directory to `LiveVote` and run the command `npm install --legacy-peer-deps` to install the project's dependencies listed in the `package.json` file.

![install_dependencies_image](https://github.com/user-attachments/assets/41806c8c-62ab-40ef-9e67-3814a134ed38)

Next, run `npx hardhat node` to launch a local Ethereum blockchain for development and testing.

If the output indicates that the port 8545 is being used by another process:

![port_already_in_use](https://github.com/user-attachments/assets/0946cd40-2be5-4fc3-84db-4a5a69b8e268)

Then run the command `netstat -ano | findstr :8545` to display the process that are using port 8545.

![process_using_port](https://github.com/user-attachments/assets/06852cae-4cc9-4636-806c-31cfc1c2a5e7)

Use this command: `taskkill /PID 2824 /F` to forcefully stop the process with PID `2824`, freeing up port 8545.

![kill_process](https://github.com/user-attachments/assets/c9529de5-1624-4bb7-835e-3662957ecae0)

Now, run `npx hardhat node` again.

![npx_hardhat_node](https://github.com/user-attachments/assets/50199871-233c-4ccb-8d8b-5353beace947)

Run the command `npx hardhat run scripts/deploy.ts --network localhost` to compile and deploy the smart contract to the local blockchain.

![deploy_smart_contract](https://github.com/user-attachments/assets/d961c805-3d38-4b58-85bc-92196bbf941c)

In MetaMask, import an account by copying and pasting the private key string given previously.

![metamask_import_account](https://github.com/user-attachments/assets/554ae8a6-df48-44cf-bfe0-ecc7f2428d4f)

Go to Settings > Networks > Add a network > Add a network manually, and enter network details.

![metamask_add_network](https://github.com/user-attachments/assets/1d0669c4-1850-4ee7-92d3-865490e9da71)

After saving, click on the network dropdown and switch to the network created.

![metamask_select_network](https://github.com/user-attachments/assets/a79df119-a877-44c4-9a1f-c46e77614ae0)

Once all the setups are completed, run the backend in IntelliJ.

![run_backend](https://github.com/user-attachments/assets/5276480e-8706-4484-9026-7c0ef39a416f)

Run the frontend server in Visual Studio Code with the `npm run dev` command.

![run_frontend_server](https://github.com/user-attachments/assets/e398e906-3ff3-4005-be46-e3445026cd93)

Click on the URL after Local to access the application on the local development server.

![livevote_homepage](https://github.com/user-attachments/assets/b0e0d508-4879-426c-a3d4-068ce492571d)

---

## System Features

### Admin

#### _Sign In_

Admin can log in to the application by clicking on the Sign In button and enter username and password.

![admin_login](https://github.com/user-attachments/assets/2e04ec88-b5ba-48f9-bc81-a0d7c56adaf7)

![admin_homepage](https://github.com/user-attachments/assets/369b5d72-66a0-420f-bca0-c41893a756ec)

#### _Create New Proposal_

Admin can create a new voting by clicking the "New Proposal" button in the home page.

When creating a proposal, the avatar is a required input, the admin must upload an image as the visual representation of the proposal.

![image_reminder](https://github.com/user-attachments/assets/9108527e-5aa0-419f-8123-7c7d89cdc928)

![create_proposal_1](https://github.com/user-attachments/assets/d67032ec-088b-4265-ad26-bcd54422aa09)

Each choice must also have an associated image.

![choice_image_reminder](https://github.com/user-attachments/assets/f16a2fc5-3bd4-449e-9cfa-3e44e1a985b3)

![create_proposal_2](https://github.com/user-attachments/assets/d8ea8d1b-5fe2-497c-856d-b66e8c0ac774)

The "Voting QR" field indicates how many votes can be cast in the voting, and the voting period determines when the voting will start and how long it will be open.

![create_proposal_3](https://github.com/user-attachments/assets/7e5753c8-2482-49ab-94d6-2413e96ef090)

After entering all the details for the voting proposal, hit the "Publish" button.

![create_proposal_4](https://github.com/user-attachments/assets/8d7dd009-bdc9-43ed-b1f3-05f9948900b0)

The voting proposal can have three statuses:

1. Pending: The voting hasn't started yet and is not open for users to participate in.

2. Active: The voting is in progress. Users can cast their votes during this period.

3. Closed: The voting period has ended.

![three_statuses](https://github.com/user-attachments/assets/fedaf90a-0c1c-4874-a32a-b888d2b5c3de)

#### _Pending Proposal_

If a proposal is scheduled to start in the future, its status will initially be "Pending".

![pending_proposal_testing](https://github.com/user-attachments/assets/792a7578-9c28-4fc1-9f9e-6d77965c5143)

On the homepage, it will display a countdown showing the days or time remaining until voting starts.

![pending_with_time](https://github.com/user-attachments/assets/c533dd59-ab1e-4c66-a73c-d76227bc88d0)

Once the start time is reached, the status will automatically change to "Active".

![pending_become_active](https://github.com/user-attachments/assets/abb475b0-68b7-42fa-8c8e-9115d33f81b0)

#### _Generate QR Codes_

Admin can download the generated QR codes folder by clicking on the download icon.

![admin_get_qr](https://github.com/user-attachments/assets/a8901dd3-91d9-47f8-95c8-c5bd8fec9595)

The downloaded folder contains 30 QR codes each with a unique token, representing one vote in the voting process. These QR codes will be either printed on physical tickets (which users will receive at the event) or sent via email to users who are allowed to vote.

![qr_folder](https://github.com/user-attachments/assets/ae0342a4-090e-4d19-9777-1001dd715742)

### General User

#### _Connect Wallet_

Normal users can click the "Connect Wallet" button located at the top right corner and use MetaMask to interact with the application.

![connect_wallet](https://github.com/user-attachments/assets/77ee2b4d-283a-408c-901b-2dc34f7e9afd)

Select an account to proceed.

![metamask_select_account](https://github.com/user-attachments/assets/26dda56b-b9db-40bd-8714-5f9e02208de9)

![wallet_connected](https://github.com/user-attachments/assets/25f7c809-4e2a-47b8-b2ff-1e45753b1e23)

#### _Voting Process_

Users can select and view details of the proposals that are listed on the homepage.

![user_voting](https://github.com/user-attachments/assets/5fa2066a-4ae9-4fae-ad8c-c3f548ef0bec)

However, users are not allowed to vote directly, if they don't have voting power for that proposal.

![no_voting_power](https://github.com/user-attachments/assets/6c5695bd-1df7-49a4-bb46-3f0122af4204)

Instead, users have to scan the QR received to gain access to the voting section.

![scan_qr_1](https://github.com/user-attachments/assets/22269120-5f81-4d10-bc66-32840050ef9a)

After scanning a valid QR code, it will show this message:

![qr_scanned](https://github.com/user-attachments/assets/e24bb5ea-4e56-4b13-9887-200b85dc3e97)

The token contained inside the QR code is not allowed to be redeemed twice, when the QR is scanned again, the system will show this message.

![token_already_redeemed](https://github.com/user-attachments/assets/37a637d9-0a6d-429b-9725-00a0cf39f772)

And the user can now cast a vote from the options.

![cast_a_vote](https://github.com/user-attachments/assets/51c60648-654f-4912-87ea-24807aae949f)

Upon clicking the "Confirm" button, Metamask will open a popup window displaying the calculated gas fee for the transaction.

![metamask_gas_fee](https://github.com/user-attachments/assets/7ef04285-6373-400e-942c-929478cf08e7)

If users approve the transaction, their votes will be recorded on the blockchain.

![finish_voting](https://github.com/user-attachments/assets/84e7182d-72b0-436f-b371-fc4689788c1b)

#### _Voting Results_

Once the voting period ends, the proposal status will become "Closed". Users can click on the proposal to view detailed voting information.

![voting_end](https://github.com/user-attachments/assets/13eda7bc-e468-4aa2-ab00-8f7333366a10)

The system lists each wallet address that participated in the vote and the option they voted for.

![vote_of_each_wallet](https://github.com/user-attachments/assets/1c673013-3d83-4b0a-b3ee-0c5838802562)

The percentages of total votes received by each option and the percentage of users who voted compared to the total number of QR codes issued for that proposal are also displayed.

![option_percent_voter_turnout](https://github.com/user-attachments/assets/96d433e5-372b-417f-a16f-edfe382266af)

### Remarks

If transactions are stuck or nonce errors occur after restarting the Hardhat node or resetting the blockchain, the user will need to clear the activity and nonce data in MetaMask to sync with the blockchain.

![clear_activity_tab_data](https://github.com/user-attachments/assets/679e8ce0-5280-456b-a4ee-b9e294340ddc)

## Repositories

[Frontend Code](https://github.com/GG-dodcom/DAO-Voting-System.git)

[Backend Code](https://github.com/brianwong0819/Blockchain-Assignment-Backend-.git)
