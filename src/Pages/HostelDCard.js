import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document, PDFViewer, Font, Image, StyleSheet } from '@react-pdf/renderer';
import { useSelector } from "react-redux";
// import Arial from 

const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        backgroundColor: '#E4E4E4',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: "center",
        //justifyContent: 'center',
        padding: 5,
        transform:"rotate(90deg)",
        position:"absolute",
        left:"auto",
        top:275,
        right:0,
    },
    img: {
        width: 100,
        height: 100,
        marginHorizontal: "auto",
        marginVertical: 10,
    },
    instructions: {
        marginBottom: 10,
        // marginLeft:15,
        textAlign:"left"
    },
    columnsContainer: {
        flexDirection: 'row',
    },
    column: {
        border: "1px",
        marginHorizontal: "auto",
        width: 350,
        height:225,
        textAlign: "center"
    },
    columnData: {
        marginHorizontal: "auto",
        // width:300,
        textAlign: "center"
    },
    columnDataInstr: {
        marginHorizontal: 10,
        // width:300,
        textAlign: "left"
    },
    endLineRight: {
        marginLeft: "auto",
        marginRight:20,
        marginTop:20,
        // width:300,
        textAlign: "left"
    },
    columnDataSecondary: {
        // width: 100,
        marginHorizontal: 10,
        marginTop: 20,
        textAlign: "left"
    },
    small: {
        fontSize: 8,
    },
    headers: {
        fontFamily:"Helvetica-Bold",
        marginTop:5,
        marginBottom: 10,
        marginLeft:10,
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal:15,
    },
    bullet:{
        height: '100%',
    }
});
Font.register({
    family: 'Helvetica-Bold',
    
});
const HostelDCard = () => {
    const { id } = useParams();
    const [bednPriceData, setBednPriceData] = useState(null)
    const [application, setApplication] = useState();
    const user = useSelector((state) => state.user.currentUser);
    const instructionList = ["The ID card must be displayed by holder upon entering hostel premises","In case of loss,duplicate card will be issued on payment of Rs 200/-","Please ensure safe custody of ID card and in case of loss report immediately to hostel office."]
    useEffect(() => {
        const getSingleApplication = async (app_id) => {
            try {
                const resp = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${app_id}`, {

                    method: "GET",

                });
                const json = await resp.json();
                setApplication(json[0]);
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

        getSingleApplication(id);
        getAllotedData();
    }, [])
    
    const ListItem = instructionList.map((children,index) => {
        return (
            <View style={styles.row} key={index}>
                <View style={styles.bullet}>
                    <Text>{(index+1) + ". "}</Text>
                </View>
                <Text>{children}</Text>
            </View>
        )
    })
    return (
        <div>
            <div className="stud_app" style={{ width: "100%", height: "100vh", fontSize: "small" }}>
                <PDFViewer style={{ width: "100%", height: "100%", fontSize: 'small' }}>
                    {application && bednPriceData ? <Document title={application.name+" "+application.roll_no}>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.container}>
                                <View style={styles.column}>
                                    <Text>{`\n`}Delhi Technological University{`\n\n`}</Text>
                                    <Text style={styles.headers}>Hostel ID Card{`(Session : 2022-2023)`}</Text>
                                    <View style={styles.columnsContainer}>
                                        <View style={styles.columnData}>
                                            <Image style={styles.img} src={"https://images.unsplash.com/photo-1684005733545-e604a648d4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=802&q=80"} />
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