import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { useContract } from "./hooks/hooks";
import { useNavigate } from "react-router-dom";

function App() {
  let title, description, targetAmount, deadline
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState();
  const contract = useContract();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(title != "" && description !="" && targetAmount !=0 && deadline !="") {
      deadline = new Date(deadline).getTime();
      targetAmount = targetAmount.toString() + "000000000000000000";
      console.log(title, description, targetAmount, deadline);
      try{  
        const id = await contract.createCampaign(title, description, targetAmount, deadline);
        const rec = await id.wait();
        console.log("Hurray!\n", "Heres your ID\n ", id);
        const campaignId = rec.events[0].args[1];
        navigate(`/campaigns/${campaignId}`);
        setLoading(false)
      } catch(e) {
        console.log("An Error has occured \n", e);
        setError(true);
        setLoading(false);
      }
    }
  }

  return(
    <>
      <header>
        <b>CrowdFund</b>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="campaign-title">Campaign Title</label>
            <InputText id="campaign-title" className="p-inputtext-sm" onChange={(e)=>{title=e.target.value}}/>
          </div> 
          <div className="form-item"> 
            <label htmlFor="campaign-description">Campaign Description</label>
            <InputTextarea id="campaign-desciption" rows={5} cols={30} onChange={(e)=>{description=e.target.value}}/>
          </div> 
          <div className="form-item">  
            <label htmlFor="campaign-target-amount">Target Amount</label>
            <InputNumber id="campaign-target-amount" suffix=" KAIA" onValueChange={(e)=>{targetAmount=e.value}}/>
          </div>
          <div className="form-item">  
            <label htmlFor="campaign-deadline">Deadline</label>
            <Calendar id="campaign-deadline"  onChange={(e)=>{deadline=e.target.value}} showIcon/>
          </div>
          <Button label="Submit" size="small" style={{borderRadius: "2em", width: "100%", marginTop: "1em"}} loading={loading}></Button>
          {error && <p>There's been an error while sending the transaction</p>}
        </form>
      </main>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quae possimus distinctio porro tempore ab fuga nisi, vitae quos at assumenda magni, maxime temporibus ducimus fugit amet natus rem laboriosam.
      Quod quis autem accusamus incidunt ipsa, cum, inventore minus recusandae officia omnis dolore, sit doloribus dolorum totam? Atque dolores, neque quidem hic possimus distinctio nam minima. Libero inventore dolorem voluptatem.
      Cupiditate placeat similique vitae ullam sapiente, temporibus quos iure reiciendis omnis quibusdam exercitationem fugit ipsum ut eos qui suscipit dolorum aliquid. Vero quas placeat facere ipsum minima perferendis soluta? Sit! */}
      
    </>
  );
}

export default App
