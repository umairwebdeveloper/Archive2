-- CreateTable
CREATE TABLE `ExamSubjectPdf` (
    `id` VARCHAR(191) NOT NULL,
    `category` ENUM('EXAM', 'CORRECTION_MODEL', 'WORK_APPENDIX', 'CORRECTION_MODEL_ADDITION') NOT NULL,
    `file` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;