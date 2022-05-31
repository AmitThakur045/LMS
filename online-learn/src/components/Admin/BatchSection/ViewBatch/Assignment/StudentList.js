import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StudentList = ({ studentList }) => {
  return (
    <>
      {studentList.length !== 0 ? (
        <div className="w-[35rem] h-full">
          <List>
            {studentList.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <img
                    src={item.image}
                    alt={item.email}
                    className="w-[20px] h-[20px] rounded-full"
                  />
                </ListItemIcon>
                <ListItemText primary={`${item.firstName} ${item.lastName}`} />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div className="w-[35rem] h-full"></div>
      )}
    </>
  );
};

export default StudentList;
