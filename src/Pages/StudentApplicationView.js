import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// import images from '../../api/images'
// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    backgroundColor: "#fff",
  },
  img: {
    width: 120,
    height: 120,
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    //   justifyContent: 'center',
    padding: 0,
    marginTop: 15,
  },
  topSection: {
    marginBottom: 20,
  },
  columnsContainer: {
    flexDirection: "row",
  },
  column: {
    marginHorizontal: 10,
  },
  topRightContent: {
    marginLeft: "auto",
    marginRight: 15,
  },
  small: {
    fontSize: 8,
  },
  data: {
    marginLeft: "auto",
    fontSize: 10,
  },
  middleSection: {
    marginBottom: 0,
  },
  dataSections: {
    flexDirection: "row",
    borderBottom: "1px",
    width: 275,
  },
  headers: {
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px",
    width: 275,
  },
  longtext: {
    letterSpacing: 0,
    marginLeft: "auto",
    fontSize: 10,
    // flexWrap:"wrap"
    flex: 1,
  },
  nxtLineHeaders: {
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px",
    width: 275,
    marginTop: 20,
  },
});
const topSectionLeftContent = `DELHI TECHNOLOGICAL UNIVERSITY
(Formerly Delhi College of Engineering)
Established under Govt. of Delhi Act 6 of 2009`;
const topSectionRightContent = `HOSTEL REGISTRATION FORM\n\t\t\t\t\t\t\t\t\tACADEMIC YEAR 2022-23`;

const address = `SHAHBAD,BAWANA ROAD,DELHI,PH-27852204`;
const middleSectionContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nSed sagittis, tortor nec\n lacinia consequat, felis mi fringilla libero, a lacinia sem neque vel massa.\n Morbi ut diam id felis condimentum posuere. Nulla facilisi. Vivamus id velit odio. Aliquam erat volutpat.`;
Font.register({ family: "Helvetica-Bold" });

const StudentApplicationView = () => {
  const { id } = useParams();
  const [application, setApplication] = useState();
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    const getSingleApplication = async (app_id) => {
      try {
        const resp = await fetch(
          `http://localhost:4000/hostelreg/applications/auth/application/${app_id}`,
          {
            method: "GET",
          }
        );
        const json = await resp.json();
        console.log(json);
        setApplication(json[0]);
        // console.log(application.ProfilePic)
        const photoresponse = await fetch(
          `http://localhost:4000/upload/${
            json[0].ProfilePic.slice(0, 4) +
            "_" +
            json[0].ProfilePic.slice(5, 7) +
            "_" +
            json[0].ProfilePic.slice(8)
          }.jpg`,
          {
            method: "GET",
          }
        );
        const newJson = await photoresponse.json();
        const array = [newJson];
        console.log(array);
        setPhoto(array);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleApplication(id);
  }, []);
  if (application && photo) {
    return (
      <div>
        {/* this is the complete view of the student application */}
        <div
          className="stud_app"
          style={{ width: "100%", height: "100vh", fontSize: "small" }}
        >
          <PDFViewer
            style={{ width: "100%", height: "100%", fontSize: "small" }}
            showToolbar={true}
          >
            <Document title={application.name + " " + application.roll_no}>
              <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                  <View style={styles.topSection}>
                    <View style={styles.columnsContainer}>
                      <View style={styles.column}>
                        <Text>{topSectionLeftContent}</Text>
                      </View>
                      <View style={styles.topRightContent}>
                        <Text>{topSectionRightContent}</Text>
                        <Text style={styles.small}>{address}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.middleSection}>
                    {photo.map((singleData, index) => {
                      const base64String = btoa(
                        String.fromCharCode(
                          ...new Uint8Array(singleData.img.data.slice())
                        )
                      );
                      return (
                        <Image
                          key={index}
                          style={styles.img}
                          src={`data:image/png;base64,${base64String}`}
                        />
                      );
                    })}
                    {/* {<Image style={styles.img} src={'http://localhost:4000/upload/2K19:AE:035.png'}></Image>} */}
                    <View style={styles.columnsContainer}>
                      <View style={styles.column}>
                        <Text style={styles.headers}>PERSONAL DETAILS</Text>
                        <View style={styles.dataSections}>
                          <Text>{`Roll No`}</Text>
                          <Text style={styles.data}>{application.roll_no}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Name`}</Text>
                          <Text style={styles.data}>{application.name}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Gender`}</Text>
                          <Text style={styles.data}>{application.gender}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Phone Number`}</Text>
                          <Text style={styles.data}>
                            {application.phone_no}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Email-ID`}</Text>
                          <Text style={styles.data}>{application.email}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Admission year`}</Text>
                          <Text style={styles.data}>
                            {application.year_of_admission}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Blood Group`}</Text>
                          <Text style={styles.data}>
                            {application.blood_group}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Distance`}</Text>
                          <Text style={styles.data}>
                            {application.distance}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Region`}</Text>
                          <Text style={styles.data}>{application.region}</Text>
                        </View>
                        {/* Father details */}
                        <Text style={styles.nxtLineHeaders}>
                          PARENTS DETAILS
                        </Text>
                        <View style={styles.dataSections}>
                          <Text>{`Father Name`}</Text>
                          <Text style={styles.data}>
                            {application.father_name}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Father Phone No`}</Text>
                          <Text style={styles.data}>
                            {application.father_phone_no}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Father Email`}</Text>
                          <Text style={styles.data}>
                            {application.father_email}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Father Occupation`}</Text>
                          <Text style={styles.data}>
                            {application.father_occupation}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Father Office Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.father_office_address}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Father Office Phone No`}</Text>
                          <Text style={styles.data}>
                            {application.father_office_phone_no}
                          </Text>
                        </View>
                        {/*
                                                <View style={styles.dataSections}>
                                                    <Text style={{marginRight:10}}>{`Father Office Address`}</Text>
                                                    <Text style={styles.longtext}>{application.father_office_address
}</Text>
                                                </View> 
                                                <View style={styles.dataSections}>
                                                    <Text>{`Father Office No`}</Text>
                                                    <Text style={styles.data}>{application.father_office_no
}</Text>
                                                </View> 
                                                */}

                        {/* Mother data */}
                        <View style={styles.dataSections}>
                          <Text>{`Mother Name`}</Text>
                          <Text style={styles.data}>
                            {application.mother_name}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Mother Email`}</Text>
                          <Text style={styles.data}>
                            {application.mother_email}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Mother Occupation`}</Text>
                          <Text style={styles.data}>
                            {application.mother_occupation}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Mother Office Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.mother_office_address}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Mother Office Phone No`}</Text>
                          <Text style={styles.data}>
                            {application.mother_office_phone_no}
                          </Text>
                        </View>
                        <Text style={styles.nxtLineHeaders}>
                          RESIDENTIAL DETAILS
                        </Text>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Home Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.home_address}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Home City`}</Text>
                          <Text style={styles.data}>
                            {application.home_city}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Home State`}</Text>
                          <Text style={styles.data}>
                            {application.home_state}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Home Country`}</Text>
                          <Text style={styles.data}>
                            {application.home_country}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Home Pincode`}</Text>
                          <Text style={styles.data}>
                            {application.home_pincode}
                          </Text>
                        </View>
                        <Text style={styles.nxtLineHeaders}>
                          LOCAL GAURDIAN DETAILS
                        </Text>
                        <View style={styles.dataSections}>
                          <Text>{`Gaurdian Name`}</Text>
                          <Text style={styles.data}>
                            {application.local_guardian_name}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Gaurdian Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.local_guardian_address}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Gaurdian Phone No`}</Text>
                          <Text style={styles.data}>
                            {application.local_guardian_phone_no}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Gaurdian Email`}</Text>
                          <Text style={styles.data}>
                            {application.local_guardian_email}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.headers}>ACADEMIC DETAILS</Text>
                        <View style={styles.dataSections}>
                          <Text>{`Course`}</Text>
                          <Text style={styles.data}>{application.course}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Branch`}</Text>
                          <Text style={styles.data}>{application.branch}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Semester`}</Text>
                          <Text style={styles.data}>
                            {application.semester}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Back Papers`}</Text>
                          <Text style={styles.data}>
                            {application.back_papers}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`SGPA`}</Text>
                          <Text style={styles.data}>{application.sgpa}</Text>
                        </View>
                        {/* Bank details */}
                        <Text style={styles.nxtLineHeaders}>BANK DETAILS</Text>
                        <View style={styles.dataSections}>
                          <Text>{`Account Number`}</Text>
                          <Text style={styles.data}>{application.acc_no}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Account Holder`}</Text>
                          <Text style={styles.data}>
                            {application.acc_holder_name}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Bank Name`}</Text>
                          <Text style={styles.data}>
                            {application.bank_name}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`IFSC`}</Text>
                          <Text style={styles.data}>{application.ifsc}</Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Bank Branch`}</Text>
                          <Text style={styles.data}>
                            {application.bank_branch}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Bank Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.bank_address}
                          </Text>
                        </View>
                        <Text style={styles.nxtLineHeaders}>
                          CORRESPONDING ADDRESS
                        </Text>
                        <View style={styles.dataSections}>
                          <Text
                            style={{ marginRight: 10 }}
                          >{`Corr. Address`}</Text>
                          <Text style={styles.longtext}>
                            {application.corr_address}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Corr. City`}</Text>
                          <Text style={styles.data}>
                            {application.corr_city}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Corr. State`}</Text>
                          <Text style={styles.data}>
                            {application.corr_state}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Corr. Country`}</Text>
                          <Text style={styles.data}>
                            {application.corr_country}
                          </Text>
                        </View>
                        <View style={styles.dataSections}>
                          <Text>{`Corr. Pincode`}</Text>
                          <Text style={styles.data}>
                            {application.corr_pincode}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
};

export default StudentApplicationView;
