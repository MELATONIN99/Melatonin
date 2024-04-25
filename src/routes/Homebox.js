import {SectionsContainer, Section} from 'react-fullpage';
import Section1 from "../component/Section1";
import Section2 from '../component/Section2';
import Section3 from '../component/Section3';
import Section4 from '../component/Section4';

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
        <div>
        <SectionsContainer {...options}>
            <Section className="Section1">
                <Section1 />
            </Section>

            <Section className="Section2">
                <Section2 />
            </Section>

            <Section className="Section3">
                <Section3 />
            </Section>
                
            <Section className="Section4">
                <Section4 />
            </Section>
        </SectionsContainer>
        </div>
    )

}