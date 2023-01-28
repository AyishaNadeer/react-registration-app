import { makeStyles } from '@material-ui/core/styles';

const globalUseStyles = makeStyles((theme) => ({
    root: {
      
        textAlign:"center",
        
      },
      mainCard: {
        backgroundColor: 'info.light', 
        display:'block',
       
      },
      innerCard: {
        justifyContent:'center',
         display: 'flex'
      },
      stepperBox: {
        display:"flex",  
        flexDirection:"row", 
        justifyContent:"right"
      },
      appBar: {
       
        borderBottomLeftRadius: 20
      },
      textLeft: {
        textAlign:"left"
      },
      textRight: {
        textAlign:"right"
      },
      formBox: {
        display: "block", border: "2px dashed grey",borderRadius: "60px",height: "auto", background: "#FFF", margin: '5'
      },
      inputLabel: {
        textAlign: "right"
      },
      input: {
        fontSize: "20px",width: 200, border: "1px solid black", borderRadius: 5, scale: 0.9
      },
      button: {
        height:"100%" ,display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"
      },
      canvasContainer: {
        border:"2px dashed grey", borderRadius:"15%", alignSelf:"flex-start", height:"40%", textAlign: "center" 
      },
      canvas: {
        position:"relative", height:"100%", width:"100%",
      }
    
}));

export default globalUseStyles