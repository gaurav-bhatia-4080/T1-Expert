import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { pendingExercise } from "../store/atoms/listsForMain";
import { useRecoilValue } from "recoil";
import { Line } from "react-chartjs-2";
import { getPatientsICRLists, icrRefetchTrigger } from "../store/atoms/patientDetails.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { useParams } from "react-router-dom";
const EditICRDialog = (props) => {
    const { id } = useParams();
    const setTrigger = useSetRecoilState(icrRefetchTrigger(id));
    const icrLists = useRecoilValue(getPatientsICRLists(id));
    // const { bicr, licr, dicr } = icrLists;
    const { bicr: bi, licr: li, sicr: si, dicr: di } = props.icrLists;
    console.log("icrLists");
    console.log(icrLists)
    console.log(si);
    console.log(bi.length)
    const [bicr, setBicr] = useState(bi[bi.length - 1].value);
    const [licr, setLicr] = useState(li[li.length - 1].value);
    const [sicr, setSicr] = useState(si[si.length - 1].value);
    const [dicr, setDicr] = useState(di[di.length - 1].value);

    const [b, setB] = useState(null);
    const [pendingList, setPendingList] = useRecoilState(pendingExercise);

    const handleBicrChange = (e) => {
        setBicr(e.target.value);

    };

    const handleLicrChange = (e) => {
        setLicr(e.target.value);
    };
    const handleSicrChange = (e) => {
        setSicr(e.target.value);
    };
    const handleDicrChange = (e) => {
        setDicr(e.target.value);
    };


    const handleSubmit = () => {
        // props.startLoading();
        toast.promise(
            axios.post(
                `${process.env.REACT_APP_API_URL}/updateICRs`,
                {
                    id,
                    bicr,
                    licr,
                    sicr,
                    dicr,

                },
                { withCredentials: true }
            ),
            {
                loading: "Updating...",
                success: (res) => {
                    props.onClose();

                    setTrigger(prev => prev + 1);
                    // setPendingList((prevList) =>
                    //     prevList.filter((item) => item.exercise_name !== props.id)
                    // );
                    return "Updated successfully.";
                },
                error: (err) => {
                    props.onClose();
                    return "Something went wrong. Try again!";
                },
            },
            {
                iconTheme: {
                    primary: "black",
                    secondary: "white",
                },

                style: {
                    fontFamily: "'Balsamiq Sans', cursive",
                    border: "1px solid rgb(207, 207, 207)"

                },
            }
        );
    };

    // Create the dialog content
    const dialogContent = (
        <div className="dialog-container open">
            <div className="dialog-box">
                <div className="dialog-header">
                    <div style={{ fontSize: "2rem" }}>ICR values</div>
                    <div onClick={props.onClose} style={{ cursor: "pointer" }}>
                        <MdClose size={23} color="white" />
                    </div>
                </div>
                <div className="dialog-content">
                    <div className="dialog-title">Breakfast ICR</div>
                    <input
                        name="name"
                        type="text"
                        className="input-div-styling"
                        placeholder="Breakfast ICR"
                        value={bicr}
                        onChange={handleBicrChange}
                    />
                    <div className="dialog-title">Lunch ICR</div>
                    <input
                        name="name"
                        type="text"
                        className="input-div-styling"
                        placeholder="Lunch ICR"
                        value={licr}
                        onChange={handleLicrChange}
                    />
                    <div className="dialog-title">Snack ICR</div>
                    <input
                        name="name"
                        type="text"
                        className="input-div-styling"
                        placeholder="Snack ICR"
                        value={sicr}
                        onChange={handleSicrChange}
                    />
                    <div className="dialog-title">Dinner ICR</div>
                    <input
                        name="name"
                        type="text"
                        className="input-div-styling"
                        placeholder="Dinner ICR"
                        value={dicr}
                        onChange={handleDicrChange}
                    />
                    <div className="submit-button" onClick={handleSubmit}>
                        Save changes
                    </div>
                </div>
            </div>
        </div>
    );

    // Use React Portal to render the dialog outside of the parent
    return ReactDOM.createPortal(dialogContent, document.body);
};

export default EditICRDialog;
