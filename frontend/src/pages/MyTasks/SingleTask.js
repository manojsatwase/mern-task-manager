import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useCallAPI } from "../../customHooks/useCallAPI";
import { capitalize } from "../../constant";
import { Link } from "react-router-dom";

const SingleTask = ({singleTask}) => {
    const {deleteTaskAPI} = useCallAPI();

    const deleteHandler = id=>{
        if(window.confirm("Are You Sure ?")){
          // const deleteNotes = tasks.filter(note=>note._id !== id);
          deleteTaskAPI(id);
        } 
      }

  const {_id,title,category,content,status,priority,dueDate,createdAt} = singleTask;
 
  return (
    <Accordion key={_id}>
    <Accordion.Item eventKey="0">
      <Card style={{margin:10}}>
      <Card.Header style={{display:'flex',justifyContent:"space-evenly"}}>
       <span style={{
        color:"black",
        textDecoration:"none",
        flex:1,
        cursor:"pointer",
        alignSelf:"center",
        fontSize:18,
        marginBottom:"13px"
       }}>
         <Accordion.Header as={Card.Text} variant="link">
            Task : {title}
         </Accordion.Header>
        </span>
        <div style={{marginRight:"5rem",display:"flex"}}>
         <h5 className={`mr-5 mt-2 ${
          singleTask.status ==='completed' ? 'text-success': 
          singleTask.status ==='progress' ? 'text-primary' : 'text-warning' }`}>
          <span className="text-dark">Status :</span> {capitalize(status)}
          </h5>
         <h5 className="mr-5 mt-2">DueDate : {dueDate?.substring(0,10)}</h5>
         <h5 className="mr-5 mt-2">Priority: {capitalize(priority)}</h5>
        </div>
    <div>
      <Button className="m-2">
         <Link to={`/tasks/${singleTask._id}`}>Edit</Link>
      </Button>
      <Button
      variant="danger" 
      className="m-2"
      onClick={()=>deleteHandler(_id)} 
      >Delete</Button>
    </div>
    
    </Card.Header>
      <Accordion.Body>
    <Card.Body>
        <h4>
          <Badge bg="success" text="light">
            Category - {category}
          </Badge>
        </h4>
        <blockquote className="blockquote mb-0">
        <p>{content}</p>
           <footer>
           <title className="blockquote-footer" title="Source Title">Created On - {createdAt?.substring(0,10)}</title>
           </footer>   
      </blockquote>
    </Card.Body>
    </Accordion.Body>
    
  </Card>
  </Accordion.Item>
   </Accordion>
  )
}

export default SingleTask;
