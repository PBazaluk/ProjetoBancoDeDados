// Colocar este scrip no txt do aggregate da colection department!!!
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
          from: "student",
          localField: "dept_name",
          foreignField: "dept_name",
          as: "student",
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
          localField: "dept_name",
          foreignField: "dept_name",
          as: "instructor",
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
          path: "$instructor",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$dept_name",
          building: {
            $first: "$building",
          },
          student: {
            $first: "$student",
          },
          budget: {
            $first: "$budget",
          },
          Media: {
            $avg: {
              $toInt: "$instructor.salary",
            },
          },
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
          Departamento: "$_id",
          Total_de_Alunos: {
            $size: "$student",
          },
          Orçamento: "$budget",
          Média_Salário: "$Media",
        },
    },
]