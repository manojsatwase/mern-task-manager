// const updateNote = asyncHandler(async (req, res) => {
//   const { title, content, category } = req.body;

//   // Find the note by ID
//   const note = await Note.findById(req.params.id);

//   // Check if the note exists
//   if (!note) {
//     res.status(404);
//     throw new Error("Note not found");
//   }

//   // Check if the current user owns the note
//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   // Update the note with new data
//   note.title = title;
//   note.content = content;
//   note.category = category;

//   // Save the updated note
//   const updatedNote = await note.save();

//   // Send the updated note as response
//   res.json(updatedNote);
// });



// old way 

// const createNote = asyncHandler(async(req,res)=>{
//   const {title,content,category} = req.body;

//   if(!title || !content || category){
//     res.status(400);
//     throw new Error("Please Fill all the Fields");
//   }else{
//     // create new variable note
//     const note = new Note({user:req.user._id,title,content,category});

//     const createNote = await note.save();
   
//     res.status(201).json(createNote);
//   }
// })

// const deleteNote = asyncHandler(async(req,res)=> {
//   const note = await Note.findById(req.params.id);

//   if(note.user.toString() !== req.user._id.toString()){
//     res.status(401);
//     throw new Error("You can't perform this action")
//   }
// if(note){
//   await note.remove();
//   res.json({message:"Note Removed"})
// }else{
//   res.status(401);
//     throw new Error("You can't perform this action")
// }
// })
