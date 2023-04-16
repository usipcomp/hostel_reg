import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document,PDFViewer, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
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
                console.log(json[0])
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
                <div className="stud_app" style={{width:"100%",height:"100vh"}}>
                    <PDFViewer style={{width:"100%",height:"100%"}}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>{application.name}</Text>
                        </View>
                        <View style={styles.section}>
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