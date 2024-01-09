import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">Contact Us</h2>
        <Card>
          <CardHeader>
            <CardTitle>Contact Details for Senior High School</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-6">
              shsregistrar@tmlcr.edu.ph
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Details for College</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-6">
              collegeregistrar@tmlcr.edu.ph
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Social Media Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-6">
              <span className="text-blue-500 font-bold tracking-tight">
                Facebook:{" "}
              </span>
              <a
                href="https://www.facebook.com/TMLCR2004Official"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Teodoro M. Luansing College of Rosario
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
