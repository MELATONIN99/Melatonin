import ArtBox from "../component/ArtBox";
import Navigation from "../component/Navigation";
import OnlyText from './../component/Onlytext';
import {SectionsContainer, Section} from 'react-fullpage';
let options = {
    activeClass:          'active', // the class that is appended to the sections links
    anchors:              ['sectionOne', 'sectionTwo', 'sectionThree','sectionfour'], // the anchors for each sections
    arrowNavigation:      true, // use arrow keys
    className:            'SectionContainer', // the class name for the section container
    delay:                1000, // the scroll animation speed
    navigation:           true, // use dots navigatio
    scrollBar:            false, // use the browser default scrollbar
    sectionClassName:     'Section', // the section class name
    sectionPaddingTop:    '0', // the section top padding
    sectionPaddingBottom: '0', // the section bottom padding
    verticalAlign:        false // align the content of each section vertical
  };

export default function HomeBox() {

    return( 
        <SectionsContainer {...options}>
        {/* <h1>홈입니다.</h1>
        <OnlyText/>
        <ArtBox/> */}
        <Section className="Section1">
        <Navigation />
        Page 1
        </Section>
        <Section className="Section2">Page 2</Section>
        <Section className="Section3">Page 3</Section>
        <Section className="Section4">Page 4</Section>
        </SectionsContainer>
    )

}