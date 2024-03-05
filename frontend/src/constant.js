export const PICS =  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';
 
export const capitalize =(name) =>{
    return name?.slice(0,1).toUpperCase() + name?.slice(1).toLowerCase() || null;
}

export const setUserToLocalStorage = (data) => {
    return  localStorage.setItem("userInfo", JSON.stringify(data));
}

export const getUserToLocalStorage =()=> {
    return  JSON.parse(localStorage.getItem("userInfo"));
}

export const removeUserToLocalStorage = () => {
    return localStorage.removeItem('userInfo');
}

export const dateFormat = (date) => {
    // Adjust month indexing and add 1 to get the correct month
    const month = date?.getMonth() + 1;
    // Add leading zero if month is a single digit
    const formattedMonth = month < 10 ? `0${month}` : month;
    // Add leading zero if date is a single digit
    const formattedDate = date?.getDate() < 10 ? `0${date?.getDate()}` : date?.getDate();
    const dueDate = `${formattedMonth}/${formattedDate}/${date?.getFullYear()}`;
    return dueDate;
}

export const statusFields = ['pending','progress','completed'];
export const priorityFileds = ['high', 'medium', 'low', 'normal'];
