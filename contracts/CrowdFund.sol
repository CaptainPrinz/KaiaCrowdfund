// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract CrowdFund {

    uint256 public campaignCount = 0;

    struct Campaign {
        string title;
        string description;
        address payable recipient;
        uint256 amountRaised;
        uint256 targetAmount;
        uint256 deadline;
        bool completed;
    }

    mapping (uint256 => Campaign) public campaigns;

    event donationMade(address indexed donor, uint256 amount, uint256 campaignId);
    event campaignCreated(address indexed recipient, uint256 target, string title);
    
    function createCampaign(string memory title, string memory description, uint256 targetAmount, uint256 deadline) public {
        require(bytes(title).length != 0, "Campaign Title cannot be empty");
        require(bytes(description).length != 0, "Campaign Description cannot be empty");
        require(targetAmount != 0,"Campaign Target cannot be zero");
        require(deadline > block.timestamp, "You can not set Deadline in the past");
        //creates new campaign
        Campaign memory newCampaign = Campaign({
            title: title,
            description: description,
            recipient: payable(msg.sender),
            amountRaised: 0,
            targetAmount: targetAmount,
            deadline: deadline,
            completed: false
        });

        //add new campaign to mapping after increasing the last count
        campaignCount += 1;
        campaigns[campaignCount] = newCampaign;
        emit campaignCreated(msg.sender, targetAmount, title);
    }

    function getCampaign(uint256 campaignId) public view returns(Campaign memory){
        //checkif the ID is valid
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid Contract ID");
        return campaigns[campaignId];
    }

    function donateToCampaign(uint256 campaignId) public payable  {
        //Checking for Validation
        require(msg.value != 0, "You can not send 0!");
        require(msg.sender != campaigns[campaignId].recipient, "You can not Donate to yourself!");
        require(campaigns[campaignId].completed != true, "Campaign has already been completed!");
        require(block.timestamp <= campaigns[campaignId].deadline, "Campaign deadline has elasped!");
        
        //send funds
        campaigns[campaignId].recipient.transfer(msg.value);
        campaigns[campaignId].amountRaised += msg.value;

        //check if target amount is raised
        if(campaigns[campaignId].amountRaised >= campaigns[campaignId].targetAmount) {
            campaigns[campaignId].completed = true;
        }
        emit donationMade(msg.sender, msg.value, campaignId);
    }

}