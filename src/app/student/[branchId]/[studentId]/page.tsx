import DeleteImage from '@/components/DeleteImage';
import DeleteParent from '@/components/DeleteParent';
import DeleteRecord from '@/components/DeleteRecord';
import DeleteSibling from '@/components/DeleteSibling';
import DeleteStudent from '@/components/DeleteStudent';
import DemoteStudent from '@/components/DemoteStudent';
import { ModeToggle } from '@/components/ModeToggle';
import PromoteStudent from '@/components/PromoteStudent';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/db';
import { Parent, PreviousRecord, Sibling } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const getStudent = async (branchId: string, studentId: string) => {
  const student = db.student.findFirst({
    where: {
      id: studentId,
      branchId: branchId,
    },
    include: {
      parent: true,
      previousRecord: true,
      sibling: true,
      branch: true,
    },
  });
  return student;
};

const page = async ({ params }: pageProps) => {
  const { branchId, studentId } = params;
  const studentDetails = await getStudent(branchId, studentId);
  console.log(studentDetails);
  //@ts-ignore
  const { parent, sibling, previousRecord } = studentDetails;

  return (
    <div className="p-10 pt-16 relative">
      <div className="absolute top-2 right-4 flex gap-3 items-center">
        <h1 className="text-xl">{studentDetails?.branch.name}</h1>
        <Link
          href={`/branches/${branchId}/${studentDetails?.class}`}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Back
        </Link>
        <ModeToggle />
      </div>
      <div className="container border bg-card p-6 shadow-lg duration-200  sm:rounded-lg border-zinc-500 light:border-zinc-300 flex flex-col gap-6 relative">
        <div className="absolute top-3 right-3 flex  gap-4">
          {studentDetails?.imageDisplay ? (
            <DeleteImage studentId={studentDetails.id} />
          ) : (
            <DeleteStudent
              branchId={branchId}
              studentId={studentId}
              studentClass={studentDetails?.class ?? ''}
            />
          )}
          <Link href={`/student/${branchId}/${studentId}/upload`}>
            <Button>
              {studentDetails?.imageDownload ? 'Update Image' : 'Upload Image'}
            </Button>
          </Link>
        </div>

        <h2 className="text-5xl text-center text-primary font-semibold">
          {studentDetails?.name}&apos;s details
        </h2>
        <div className="text-xl mt-5 flex flex-col gap-5">
          <div className="grid grid-cols-[70fr_30fr]">
            <div className="flex flex-col justify-center gap-5">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Name:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={studentDetails?.name}
                  disabled
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Gender:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={studentDetails?.gender}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <span className="font-semibold w-[10rem]">Date Of Birth:</span>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={`${studentDetails?.dateOfBirth.getDate()} / ${
                    //@ts-ignore
                    studentDetails?.dateOfBirth.getMonth() + 1
                  } / ${studentDetails?.dateOfBirth.getFullYear()}`}
                  disabled
                />
              </div>
            </div>

            {studentDetails?.imageDownload ? (
              <Image
                priority
                src={studentDetails?.imageDownload}
                height={500}
                width={500}
                alt="student-photo"
                className="w-[40%] justify-self-center"
              />
            ) : (
              <p className="flex items-center justify-center text-2xl font-bold">
                No Image
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Class:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.class}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold w-[14rem]">Date Of Joining:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={`${studentDetails?.academicYear.getDate()} / ${
                  //@ts-ignore
                  studentDetails?.academicYear.getMonth() + 1
                } / ${studentDetails?.academicYear.getFullYear()}`}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Religion:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.religion}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold">Caste:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.caste}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Aadhar:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.aadharNo.toString()}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold">Moblie:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.mobileNo.toString()}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-row gap-2">
              <p className="font-semibold w-[13rem]">Mother Tongue:</p>

              <Input
                className="text-xl disabled:opacity-100"
                type="text"
                value={studentDetails?.motherTongue}
                disabled
              />
            </div>

            <div className="flex flex-row gap-2">
              <p className="font-semibold w-[10rem]">Blood group:</p>

              <Input
                className="text-xl disabled:opacity-100"
                type="text"
                value={studentDetails?.bloodGroup}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Father:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.father ? 'YES' : 'NO'}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold">Mother:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.mother ? 'YES' : 'NO'}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold w-[10rem]">Stays with:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.staysWith}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-3 items-center">
              <p className="font-semibold">Address:</p>

              <Textarea
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.address}
                disabled
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-semibold">Pincode:</p>

              <Input
                className="text-xl disabled:opacity-100 w-full"
                value={studentDetails?.pincode}
                disabled
              />
            </div>
          </div>
        </div>

        {previousRecord.map((p: PreviousRecord) => (
          <div key={p.id} className="text-xl mt-5 flex flex-col gap-5">
            <div className="flex justify-between pl-4 pr-4">
              <h2 className="text-4xl text-primary font-semibold">
                {studentDetails?.name}&apos;s previous school details
              </h2>
              <DeleteRecord recordId={p.id} />
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Name:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.name}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">Class:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.class}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Place:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.place}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold w-[12rem]">Year of Study:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.yearOfStudy.getFullYear().toString()}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Percentage:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.percentage}
                  disabled
                />
              </div>
            </div>
          </div>
        ))}

        {parent.map((p: Parent) => (
          <div key={p.id} className="text-xl mt-5 flex flex-col gap-5">
            <div className="flex justify-between pl-4 pr-4">
              <h2 className="text-4xl text-primary font-semibold">
                {studentDetails?.name}&apos;s {p.type}
              </h2>
              <DeleteParent parentId={p.id} />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Name:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.name}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">Qualification:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.qualification}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Mobile:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.mobileNo.toString()}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">Aadhar:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.aadharNo.toString()}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Occupation:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.occupation}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">Income:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.income.toString()}
                  disabled
                />
              </div>
            </div>
          </div>
        ))}

        {sibling.map((p: Sibling) => (
          <div key={p.id} className="text-xl mt-5 flex flex-col gap-5">
            <div className="flex justify-between pl-4 pr-4">
              <h2 className="text-4xl text-primary font-semibold">
                {studentDetails?.name}&apos;s{' '}
                {p.gender === 'MALE' ? 'Brother' : 'Sister'}
              </h2>
              <DeleteSibling siblingId={p.id} />
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Name:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.name}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">Age:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.age}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Class:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.class}
                  disabled
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold w-[11rem]">School name:</p>

                <Input
                  className="text-xl disabled:opacity-100 w-full"
                  value={p.nameOfSchool}
                  disabled
                />
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-6 gap-5 mt-5">
          {' '}
          <Link
            href={`/student/${branchId}/${studentId}/addParent`}
            className={buttonVariants()}
          >
            Add Parent
          </Link>
          <Link
            href={`/student/${branchId}/${studentId}/addPreviousRecord`}
            className={buttonVariants()}
          >
            Add Record
          </Link>
          <Link
            href={`/student/${branchId}/${studentId}/addSibling`}
            className={buttonVariants()}
          >
            Add Sibling
          </Link>
          <Link
            href={`/student/${branchId}/${studentId}/updateStudent`}
            className={buttonVariants()}
          >
            Update Student
          </Link>
          {studentDetails?.class !== 'Degree' && (
            <PromoteStudent
              studentId={studentId}
              studentClass={studentDetails?.class || ''}
            />
          )}
          {studentDetails?.class !== 'First' && (
            <DemoteStudent
              studentId={studentId}
              studentClass={studentDetails?.class || ''}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
