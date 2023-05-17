import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document, PDFViewer, Font, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        backgroundColor: '#E4E4E4',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: "center",
        //   justifyContent: 'center',
        padding: 5,
    },
    topSection: {
        marginBottom: 20,
    },
    columnsContainer: {
        flexDirection: 'row',
    },
    column: {
        marginHorizontal: 35,
    },
    small: {
        fontSize: 8,
    },
    middleSection: {
        marginBottom: 20,
    },
    headers:{
        fontWeight:"bold",
    }
});
const HostelDCard = () => {
    const { id } = useParams();
    const [application, setApplication] = useState();
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

        getSingleApplication(id);
    }, [])
    return (
        <div>
            <div className="stud_app" style={{ width: "100%", height: "100vh", fontSize: "small" }}>
                    <PDFViewer style={{ width: "100%", height: "100%", fontSize: 'small' }}>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                <View style={styles.container}>
                                    
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>

                </div>
        </div>
    )
}

export default HostelDCard