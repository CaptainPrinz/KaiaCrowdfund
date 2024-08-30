import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProvider, useContract } from "../hooks/hooks";
import { ethers } from "ethers";
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { Splitter } from "primereact/splitter";
import { SplitterPanel } from "primereact/splitter";
import { ProgressBar } from "primereact/progressbar";
import { InputNumber } from "primereact/inputnumber";



const Donate = () => {
    const provider = useProvider();
    const contract = useContract();
    const { campaignId } = useParams();

    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    let donationAmount = 0;

    const fetchCampaign = async() => {
        //fetch the campaign from the smart contract
      
        if(provider !== null && contract !== null){
            try {
                const campaignData = await contract.getCampaign(Number(campaignId));
                console.log(contract);
                console.log(campaignData);
                setData(campaignData);
                setLoading(false);
                setLoadingButton(false);
            } catch(e) {
                console.log("An Error has Occured!\n", e);
                setError(true);
            }
        } else {
        console.log("wont fetch\n", provider, contract);
        }
    }

    const donateToCampaign = async () => {
        setLoadingButton(true);
        const contract = useContract();
        try{
            console.log(contract);
            await contract.donateToCampaign(campaignId, {value: donationAmount.toString() +"000000000000000000"});
            setLoadingButton(false)
        }catch(e){
            console.log("An Error has occured\n", e);   
        }
    }

    useEffect(() => { fetchCampaign() }, []);
    return(
        <>
            <header>
                <b>CrowdFund</b>
            </header>
            <Splitter style={{backgroundColor: "#FBFBFB0", border: "none"}}>
                <SplitterPanel className="desktop-only">
                <section style={{padding: "1.5em"}}>
                    <div className="campaign-title">
                        <div>
                            <p>{loading == false ? data.title : <Skeleton width="250px" height="1.8em"></Skeleton>}</p>
                        </div>
                        
                    </div>
                    <div className="campaign-body">
                        
                        {loading == false ? <p className="campaign-description">{data.description}</p> :   <><Skeleton width="400px" className="mb-2"></Skeleton>
                        <Skeleton width="400px" className="mb-2"></Skeleton>
                        <Skeleton width="400px" className="mb-2"></Skeleton>
                        <Skeleton width="400px" className="mb-2"></Skeleton>
                        <Skeleton width="400px" className="mb-2"></Skeleton>
                        <Skeleton width="250px" className="mb-2"></Skeleton></>}
                    </div>
                </section>
                </SplitterPanel>
                <SplitterPanel>
                    <section style={{padding: "1.5em", width: "100%"}}>
                        <div className="campaign-detail">
                            <b>Pledge</b>
                            <div>
                                {loading == false ? <div className="amount-raised">{ethers.utils.formatEther(data.amountRaised)} KAIA</div> : <Skeleton width="50px" height="1.8em"></Skeleton>}
                            </div>
                            {loading == false ? <p className="target-amount"> of {ethers.utils.formatEther(data.targetAmount)} KAIA goal</p> : <Skeleton width="50px"></Skeleton>}
                        </div>
                        <div className="campaign-detail">
                            {loading == false ? <ProgressBar value={Math.floor(ethers.utils.formatEther(data.amountRaised)/ethers.utils.formatEther(data.targetAmount)*100)}></ProgressBar> : <ProgressBar mode="indeterminate"></ProgressBar>}
                        </div>
                        <div className="campaign-detail">
                            <b>Recipient</b>
                            {loading == false ? <p className="target-amount">{data.recipient}</p> : <Skeleton width="200px"></Skeleton>}
                        </div>
                        <div className="campaign-detail">
                            <b>Deadline</b>
                            {loading == false ? <p>{new Date(data.deadline.toNumber()).toDateString()}</p> : <Skeleton width="120px"></Skeleton>}
                        </div>
                        <div className="campaign-detail">
                            <b>Status</b>
                            {loading == false ? <p>{data.completed === true ? "Closed" : "Ongoing"}</p> : <Skeleton width="30px"></Skeleton>}
                        </div>
                        {(loading == false && data.completed==false) &&
                        <>
                            <div className="campaign-detail">
                                <form onSubmit={(e)=>{e.preventDefault()}}>
                                    <InputNumber id="campaign-target-amount" suffix=" KAIA" onValueChange={(e)=>{donationAmount=e.value}}/>
                                </form>
                            </div>
                            <Button 
                            onClick={donateToCampaign} 
                            disabled={((loadingButton && "disabled"))} 
                            style={{borderRadius: "2em"}}
                            size="small">
                                Donate
                            </Button>
                        </>}                 
                    </section>
                </SplitterPanel>
            </Splitter> 
        </>
    )
}

export default Donate;