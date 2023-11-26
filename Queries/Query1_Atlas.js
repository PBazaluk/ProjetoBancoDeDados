// Colocar este scrip no txt do aggregate da colection student!!!
[
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "advisor",
          localField: "id",
          foreignField: "s_id",
          as: "advisor",
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "instructor",
          localField: "advisor.i_id",
          foreignField: "id",
          as: "instructor",
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "teaches",
          localField: "instructor.id",
          foreignField: "id",
          as: "teaches",
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "takes",
          localField: "id",
          foreignField: "id",
          as: "takes",
        },
    },
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          $expr: {
            $eq: [
              "$teaches.course_id",
              "$takes.course_id",
            ],
          },
        },
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$advisor",
          preserveNullAndEmptyArrays: false,
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "course",
          localField: "takes.course_id",
          foreignField: "course_id",
          as: "course",
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          _id: 0,
          name: 1,
          instructor_name: "$instructor.name",
          course_name: "$course.title",
        },
    },
]