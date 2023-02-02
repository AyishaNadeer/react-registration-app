import { makeStyles } from '@material-ui/core/styles';


const globalUseStyles = makeStyles((theme) => ({
    root: {
        padding:"50px",
        textAlign:"center",
        
      },
      mainCard: {
        backgroundColor: '#68ABE6', 
        display:'block',
        height: '100%',
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
      paper: {
        backgroundColor: "#68ABE6"
      },
      formBox: {
        display: "block", border: "2px dashed grey",borderRadius: "60px",height: "auto", background: "#FFF", margin: '5'
      },
      inputLabel: {
        display:'flex',
        
        flexDirection:"column", alignItems:"right", justifyContent:"center",
        textAlign: "right"
      },
      typography: {
        alignSelf:"center"
      },
      input: {
        fontSize: "30px",width: 200, border: "1px solid black", borderRadius: 5, scale: 0.9
      },
      button: {
        height:"100%" ,display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"
      },
      inputArea : {
        justifyContent:'center', textAlign:"center",padding:"2%",display:"flex" 
      },
      profileContainer: {
        height:"120px",justifyItems:"center",alignSelf:'flex-start',border:"2px dashed grey", borderRadius:"15%", margin:0
      },
      webcamContainer: {
        height:'inherit', display: "block", justifyContent: "center", alignItems: "center"
      },
      profileIconContainer: {
        height: "inherit", justifyContent: "right", textAlign: "right"
      },
      icon: {
        height: "40%", justifyContent: "right"
      },
      cameraButtonContainer: {
        justifyContent:'center',alignItems:'center', width:'auto'
      },
      canvasContainer: {
        border:"2px dashed grey", borderRadius:"15%", alignSelf:"flex-start", height:"40%", textAlign: "center" ,padding:0
      },
      canvas: {
        position:"relative", height:"100%", width:"100%",
      }
    
}));

export default globalUseStyles