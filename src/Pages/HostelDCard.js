import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document, PDFViewer, Font, Image, StyleSheet } from '@react-pdf/renderer';
import { useSelector } from "react-redux";
// import Arial from 

const styles = StyleSheet.create({
    page: {
        fontSize: 10,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: "center",
        //justifyContent: 'center',
        padding: 5,
        transform: "rotate(90deg)",
        position: "absolute",
        left: "auto",
        top: 275,
        right: 0,
    },
    img: {
        width: 80,
        height: 80,
        marginHorizontal: "auto",
        marginVertical: 10,
    },
    instructions: {
        marginBottom: 10,
        // marginLeft:15,
        textAlign: "left"
    },
    columnsContainer: {
        flexDirection: 'row',
    },
    column: {
        border: "1px",
        marginHorizontal: "auto",
        width: 350,
        height: 200,
        textAlign: "center"
    },
    columnData: {
        marginHorizontal: "auto",
        // width:300,
        fontSize: 8,
        textAlign: "center"
    },
    columnDataInstr: {
        marginHorizontal: 10,
        // width:300,
        textAlign: "left"
    },
    endLineRight: {
        marginLeft: "auto",
        marginRight: 20,
        marginTop: 20,
        // width:300,
        textAlign: "left"
    },
    columnDataSecondary: {
        // width: 100,
        marginHorizontal: 10,
        marginTop: 20,
        textAlign: "left",
        fontSize: 9,
    },
    small: {
        fontSize: 8,
    },
    headers: {
        fontFamily: "Helvetica-Bold",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    bullet: {
        height: '100%',
    }
});
Font.register({
    family: 'Helvetica-Bold',

});
const HostelDCard = () => {
    const { id } = useParams();
    const [bednPriceData, setBednPriceData] = useState(null)
    const [photo, setPhoto] = useState({})
    const [application, setApplication] = useState();
    const user = useSelector((state) => state.user.currentUser);
    const instructionList = ["The ID card must be displayed by holder upon entering hostel premises", "In case of loss,duplicate card will be issued on payment of Rs 200/-", "Please ensure safe custody of ID card and in case of loss report immediately to hostel office."]
    const getSingleApplication = async (app_id) => {
        try {
            const resp = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${app_id}`, {

                method: "GET",

            });
            const json = await resp.json();
            setApplication(json[0]);
            const photoresponse = await fetch(`http://localhost:4000/upload/${json[0].ProfilePic.slice(0, 4) + "_" + json[0].ProfilePic.slice(5, 7) + "_" + json[0].ProfilePic.slice(8)}.jpg`, {
                method: "GET",
            })
            
            // `http://localhost:4000/upload/${json[0].ProfilePic.slice(0, 4) + ":" + json[0].ProfilePic.slice(5, 7) + ":" + json[0].ProfilePic.slice(8)}.png`
            const newJson = await photoresponse.json();
            const array = [newJson];
            console.log(array)
            setPhoto(array);
        }
        catch (err) {
            console.log(err)
        }
    }
    const getAllotedData = async () => {
        const response = await fetch("http://localhost:4000/hostelreg/applications/auth/getAllotedData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roll_no: user.student.roll_no,
            })
        })
        const json = await response.json();
        // console.log(json);
        setBednPriceData(json);
    }
    useEffect(() => {

        getSingleApplication(id);
        getAllotedData();
    }, [])

    const ListItem = instructionList.map((children, index) => {
        return (
            <View style={styles.row} key={index}>
                <View style={styles.bullet}>
                    <Text>{(index + 1) + ". "}</Text>
                </View>
                <Text>{children}</Text>
            </View>
        )
    })
    return (
        <div>
            <div className="stud_app" style={{ width: "100%", height: "100vh", fontSize: "small" }}>
                <PDFViewer style={{ width: "100%", height: "100%", fontSize: 'small' }}>
                    {application && bednPriceData ? <Document title={application.name + " " + application.roll_no}>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.container}>
                                <View style={styles.column}>
                                    <Text>{`\n`}Delhi Technological University{`\n\n`}</Text>
                                    <Text style={styles.headers}>Hostel ID Card{`(Session : 2022-2023)`}</Text>
                                    <View style={styles.columnsContainer}>
                                        <View style={styles.columnData}>
                                        {<Image style={styles.img} src={`http://localhost:4000/images/${application.ProfilePic.slice(0, 4) + "_" + application.ProfilePic.slice(5, 7) + "_" + application.ProfilePic.slice(8)}.jpg`}></Image>}
                                        </View>
                                        <View style={styles.columnsContainer}>
                                            <View style={styles.columnDataSecondary}>
                                                <Text>Name</Text>
                                                <Text>H. Roll No.</Text>
                                                <Text>Year of Admn</Text>
                                                <Text>Course</Text>
                                                <Text>Hostel,Room</Text>
                                                <Text>Remarks</Text>
                                            </View>
                                            <View style={styles.columnDataSecondary}>
                                                <Text> :  {application.name}</Text>
                                                <Text> :  {`nil`}</Text>
                                                <Text> :  {application.year_of_admission}</Text>
                                                <Text> :  {application.course}</Text>
                                                <Text> :  {bednPriceData.HostelData.Name},{bednPriceData.BedData.RoomNo}</Text>
                                                <Text> :  </Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.column}>
                                    <View style={styles.columnsContainer}>
                                        <View style={styles.columnDataSecondary}>
                                            <Text>Phone</Text>
                                            <Text>U. Roll No.</Text>
                                        </View>
                                        <View style={styles.columnDataSecondary}>
                                            <Text> :  {application.phone}</Text>
                                            <Text> :  {application.roll_no}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.instructions}>
                                        <Text style={styles.headers}>Instructions - </Text>
                                        <View style={styles.columnDataInstr}>
                                            {ListItem}
                                        </View>
                                        <View style={styles.endLineRight}>
                                            <Text>Student's Sign</Text>
                                            <Text>Validity : May 2023</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document> :
                        <Document>
                            <Page style={styles.page}>
                                <Text>loading....</Text>
                            </Page>
                        </Document>}
                </PDFViewer>

            </div>
        </div>
    )
}

export default HostelDCard