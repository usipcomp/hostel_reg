import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document,PDFViewer,Font, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontSize:"12px"
  },
  subSection: {
    margin: 5,
    padding: 5,
    fontWeight:'normal',
  },
  section:{
    margin:5,
    padding: 5,
    fontWeight:'normal',
    flexGrow:1,
    fontSize:"10px",
  }
});
Font.register({ fontStyle: 'normal', fontWeight: 'normal' });

const StudentApplicationView = () => {
    const {id} = useParams();
    const [application, setApplication] = useState();
    useEffect(() => {
        const getSingleApplication = async (app_id)=>{
            try{
                const resp = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${app_id}`,{
    
                    method:"GET",
    
                });
                const json = await resp.json();
                setApplication(json[0]);
            }
            catch(err){
                console.log(err)
            }
        }
        getSingleApplication(id);
    }, [])
    if(application){
        return (
            <div>
                {/* this is the complete view of the student application */}
                <div className="stud_app" style={{width:"100%",height:"100vh",fontSize:"small"}}>
                    <PDFViewer style={{width:"100%",height:"100%",fontSize:'small'}}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <Text>DELHI TECHNOLOGICAL UNIVERSITY</Text>
                                    <Text>{`(Formerly Delhi College of Engineering)`}</Text>
                                    <Text>{`Established under Govt. of Delhi Act 6 of 2009`}</Text>
                                </View>
                                <View style={styles.subSection}>
                                    <Text>DELHI TECHNOLOGICAL UNIVERSITY</Text>
                                    <Text>{`(Formerly Delhi College of Engineering)`}</Text>
                                    <Text>{`Established under Govt. of Delhi Act 6 of 2009`}</Text>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}></View>
                                <Text>{application.roll_no}</Text>
                            </View>
                        </Page>
                    </Document>
                    </PDFViewer>
                    
                </div>
            </div>
        )
    }
    else{
        return <div>Loading....</div>
    }
}

export default StudentApplicationView