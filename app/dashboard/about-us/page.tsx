import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">About Us</h2>
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-6">
              It was not too long ago when Mr. Teodoro M. Luansing had a vision,
              a dream, to establish a school in Rosario, the first of its kind,
              as a tribute to the place and its people whom he had learned to
              love and whose memories he would finally cherish all his life. In
              June 2005-2006, the dream of Mr. Teodoro M. Luansing has turned
              into a reality. The college, the first ever in the eastern town of
              Batangas, situated at Barangay Namunga, near the crossroads along
              National Highway in Rosario, and traversing the towns of Padre
              Garcia, San Juan, Taysan and Ibaan was inaugurated. This ushered
              the advent of collegiate education in these areas whose youths
              have been commuting to Batangas City, Lipa City, and to as far as
              Manila just to avail of the services of their colleges and
              universities. The establishments of the college meant lots of
              savings in terms of money and efforts for the students enrolled in
              TMLCR. The college soon offered scholarships for those students
              belonging to the marginalized sector and on S.Y. 2016-2017, the
              Senior High School department became available at the college. As
              of now, TMLCR continues the Founder&apos;s vision of providing
              quality but affordable education, with which the institution has
              more than 70% scholars enrolled and has a student market that is
              50% below the poverty level.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 my-1">
          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-6">
                We envision Teodoro M. Luansing College of Rosario to be an
                innovative College committed to the formation of holistic
                Teodorians, that are competent professionals, imbued with moral
                and spiritual maturity and passionately committed to become
                responsible citizens through the transformation of a culture of
                just and equitable society.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-6">
                Envisioned by the ideals of our founder, Mr. Teodoro M.
                Luansing, we will commit to the transformation of a culture of
                educational excellence through fortitude, moral integrity, and
                innovative learning, leading towards the road of financial
                freedom of the Teodorian Community.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
