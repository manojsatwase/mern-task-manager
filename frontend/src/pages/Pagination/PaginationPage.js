import Pagination from 'rc-pagination/lib/Pagination';
import React, { useState, useEffect } from 'react'

import Loading from '../../components/Loading';
import SingleTask from '../MyTasks/SingleTask';

import "./PaginationPage.css";

const PaginationComponent = ({tasks: originalTasks, loading}) => {
    // State variables for pagination control
    const [tasks, setTasks] = useState(originalTasks); // Tasks array
    const [perPage, setPerPage] = useState(5); // Number of items per page
    const [size, setSize] = useState(perPage); // Size of the current page
    const [current, setCurrent] = useState(1); // Current page number
   
    // Update tasks when the originalTasks prop changes (e.g., search)
    useEffect(() => {
        setTasks(originalTasks);
        setCurrent(1); // Reset current page to 1 when tasks change
    }, [originalTasks]);

    // Function to handle change in items per page
    const PerPageChange = (value) => {
        setSize(value); // Update the size state
        const newPerPage = Math.ceil(tasks.length / value); // Calculate new number of pages based on new size
        if (current > newPerPage) {
            setCurrent(newPerPage); // If current page exceeds new number of pages, set it to the last page
        }
    }

    // Function to get data for the current page
    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return tasks.slice((current - 1) * pageSize, current * pageSize);
    };

    // Function to handle pagination change
    const PaginationChange = (page, pageSize) => {
        setCurrent(page); // Update current page number
        setSize(pageSize); // Update page size
    }

    // Function to customize rendering of previous and next arrows
    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>; // Customized previous arrow icon
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>; // Customized next arrow icon
        }
        return originalElement;
    }

    return (
        <>
            {loading ? <Loading /> : (
                // Render the tasks for the current page
                getData(current, size)?.map(task => (
                    <SingleTask key={task._id} singleTask={task} />
                ))
            )}

            {/* Pagination component */}
            <Pagination
                className="pagination-data"
                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`} // Display total items information
                onChange={PaginationChange} // Handle pagination change event
                total={tasks.length} // Total number of items
                current={current} // Current page number
                pageSize={size} // Number of items per page
                showSizeChanger={false} // Disable size changer
                itemRender={PrevNextArrow} // Customize rendering of previous and next arrows
                onShowSizeChange={PerPageChange} // Handle change in items per page
            />
        </>
    )
}

export default PaginationComponent;
