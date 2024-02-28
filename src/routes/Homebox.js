import ArtBox from "../component/ArtBox";
import Navigation from "../component/Navigation";
import OnlyText from './../component/Onlytext';

export default function HomeBox() {

    return( 
        <div>
        <Navigation/>
        <h1>홈입니다.</h1>
        <OnlyText/>
        <ArtBox/>
        </div>
    )

}