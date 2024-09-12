// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Questions.css';  // Import the CSS file

// export default function Questions({ no, name, qlist, Checked, setChecked, qstate, setqstate }) {

//     useEffect(() => {
//         let strs = localStorage.getItem('Checked' + `${no}`);
//         console.log(strs);
//         if (strs == null) {
//             return;
//         }

//         let item1 = [], item2 = [];
//         for (let i = 0; i < strs.length; i++) {
//             if (strs[i] === '+') {
//                 item2.push((strs[i] + strs[i + 1] + strs[i + 2]));
//                 i += 3;
//             }
//             else if (strs[i] != ',' && strs[i] != '/' && strs[i] != '"' && strs[i] != '[' && strs[i] != ']' && (strs[i] < 'a' || strs[i] > 'z') && strs[i] != "\\" && strs[i] != '+' && strs[i] != '0') {
//                 item2.push(strs[i]);
//             }
//         }
//         setChecked(item2);
//         // console.log(item2);
//         localStorage.setItem('Checked' + `${no}`, JSON.stringify(item2));
//     }, []);
//     let qq = qlist;
//     function refreshPage() {
//         window.location.reload();
//     }

//     const handlechange = (id) => {

//         if (checkID(id) === true) {
//             const newList = Checked.filter((idt) => idt !== id);
//             setChecked(newList);

//             localStorage.setItem('Checked' + `${no}`, JSON.stringify(newList));
//             localStorage.setItem('qstate', JSON.stringify(newList));
//         }
//         else {
//             setChecked([...Checked, id]);
//             localStorage.setItem('Checked' + `${no}`, JSON.stringify(Checked + id));
//         }
//     }

//     let checkID = (ele) => {
//         if (Checked == null) return false;

//         for (let i = 0; i < Checked.length; i++) {
//             if (ele == Checked[i]) return true;
//         }
//         return false;
//     }
//     const handleID = (str) => {

//         let ans = str.split('');
//         ans.reverse();
//         ans.pop();
//         ans.reverse();
//         ans.join('');

//         return ans;
//     }

//     return (
//         <div className="container">
//             <div className="header">
//                 {/* <img src="Sparkle.png" alt="Sparkle" /> */}
//                 <h1>{name} Problems</h1>
//             </div>
//             <div className="navigation">
//                 <Link to="/">Topics</Link>
//                 <p>/ {name}</p>
//             </div>

//             <div className="table-container">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Question(s)</th>
//                             <th>Status</th>
//                             <th>Done</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {qq.map((ele) => (
//                             <tr key={ele.ID} className={checkID(ele.ID) ? "done" : ele.ID % 2 === 0 ? "even" : ""}>
//                                 <td>
//                                     {ele.ID[0] === '+' ? handleID(ele.ID) : ele.ID}
//                                 </td>
//                                 <td>
//                                     <Link target="_blank" to={ele.link} style={{color:"purple"}}>{ele.Q}</Link>
//                                 </td>
//                                 <td>
//                                     {checkID(ele.ID) ? (
//                                         <img src="https://cdn.pixabay.com/photo/2012/04/24/16/22/check-40319_960_720.png" alt="Checked" />
//                                     ) : (
//                                         <img src="https://th.bing.com/th/id/OIP.2Ef1V0Yr3Lv_CZLcXBBt3gHaHa?pid=ImgDet&rs=1" alt="Unchecked" />
//                                     )}
//                                 </td>
//                                 <td>
//                                     <input type="checkbox" onChange={() => handlechange(ele.ID)} checked={checkID(ele.ID)} />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Questions.css';  // Import the CSS file

export default function Questions({ no, name, qlist, Checked, setChecked }) {

    useEffect(() => {
        const strs = localStorage.getItem('Checked' + no);
        if (!strs) return;

        const item2 = [];
        for (let i = 0; i < strs.length; i++) {
            if (strs[i] === '+') {
                item2.push(strs.slice(i, i + 3));
                i += 2;
            } else if (![',', '/', '"', '[', ']', '\\', '+', '0'].includes(strs[i])) {
                item2.push(strs[i]);
            }
        }
        setChecked([...new Set(item2)]);
    }, [no, setChecked]);

    const handleChange = (id) => {
        const isChecked = Checked.includes(id);
        const newChecked = isChecked ? Checked.filter((item) => item !== id) : [...Checked, id];
        setChecked(newChecked);
        localStorage.setItem('Checked' + no, JSON.stringify(newChecked));
    };

    const handleID = (str) => {
        const reversed = str.split('').reverse().slice(1).reverse().join('');
        return reversed;
    };

    return (
        <div className="container">
            <div className="header">
                {/* <img src="Sparkle.png" alt="Sparkle" /> */}
                <h1>{name} Problems</h1>
            </div>
            <div className="navigation">
                <Link to="/">Topics</Link>
                <p>/ {name}</p>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Question(s)</th>
                            <th>Status</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qlist.map((ele) => (
                            <tr
                                key={ele.ID}
                                className={
                                    Checked.includes(ele.ID)
                                        ? "done"
                                        : ele.ID % 2 === 0
                                        ? "even"
                                        : ""
                                }
                            >
                                <td>
                                    {ele.ID.startsWith('+') ? handleID(ele.ID) : ele.ID}
                                </td>
                                <td>
                                    <Link target="_blank" to={ele.link} style={{ color: "purple" }}>
                                        {ele.Q}
                                    </Link>
                                </td>
                                <td>
                                    <img
                                        src={Checked.includes(ele.ID)
                                            ? "https://cdn.pixabay.com/photo/2012/04/24/16/22/check-40319_960_720.png"
                                            : "https://th.bing.com/th/id/OIP.2Ef1V0Yr3Lv_CZLcXBBt3gHaHa?pid=ImgDet&rs=1"}
                                        alt={Checked.includes(ele.ID) ? "Checked" : "Unchecked"}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleChange(ele.ID)}
                                        checked={Checked.includes(ele.ID)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
