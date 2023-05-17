import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Page, Text, View, Document, PDFViewer, Font, StyleSheet } from '@react-pdf/renderer';

// Create styles
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
const topSectionLeftContent = `DELHI TECHNOLOGICAL UNIVERSITY
(Formerly Delhi College of Engineering)
Established under Govt. of Delhi Act 6 of 2009`;
const topSectionRightContent = `HOSTEL REGISTRATION FORM\n\t\t\t\t\t\t\t\t\tACADEMIC YEAR 2022-23`;

const address = `SHAHBAD,BAWANA ROAD,DELHI,PH-27852204`;
const middleSectionContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nSed sagittis, tortor nec\n lacinia consequat, felis mi fringilla libero, a lacinia sem neque vel massa.\n Morbi ut diam id felis condimentum posuere. Nulla facilisi. Vivamus id velit odio. Aliquam erat volutpat.`;
Font.register({ fontStyle: 'normal', fontWeight: 'normal' });

const StudentApplicationView = () => {
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
    if (application) {
        return (
            <div>
                {/* this is the complete view of the student application */}
                <div className="stud_app" style={{ width: "100%", height: "100vh", fontSize: "small" }}>
                    <PDFViewer style={{ width: "100%", height: "100%", fontSize: 'small' }}>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                <View style={styles.container}>
                                    <View style={styles.topSection}>
                                        <View style={styles.columnsContainer}>
                                            <View style={styles.column}>
                                                <Text>{topSectionLeftContent}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text>{topSectionRightContent}</Text>
                                                <Text style={styles.small}>{address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.middleSection}>
                                        <View style={styles.columnsContainer}>
                                            <View style={styles.column}>
                                                <Text style={styles.headers}>PARENTS DETAILS</Text>
                                                <Text>{`Name`}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text>{middleSectionContent}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>

                </div>
            </div>
        )
    }
    else {
        return <div>Loading....</div>
    }
}

export default StudentApplicationView