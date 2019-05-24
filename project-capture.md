# Project Capture Document for Canvas Question Bank Search and Replace
#### *Author: Jacob Schwantes*
#### *Stakeholder(s): Josh*
#### *Date: 5/20/2019*

---

## Background
#### Important note: This project has not yet been approved
---
Some canvas courses have "question bank:" written out in the quiz question banks and it cuts off part of the question. We want to change it to "qb:". Efforts have been put into place to use an API call and some other things to fix the issue, but they don't have an API call for it. We have decided to use puppeteer to automate a browser to change all of the strings. We will need to know which courses have those questions, then loop through all the courses and do a search and replace.

## Recap (tl;dr)
-----
A puppeteer program to replace "question bank:" to "qb:" in Canvas courses
# Requirements
#### Source of Inputs
-----
The input will be a JSON file that has course objects. Josh will give me some form of file or input that tells us which courses need the search and replace. For now I can work on the main program which will perform the search and replace, and later work on the bin file which will handle inputs when we get those.

#### Definition of Inputs
---
Again, don't really know yet. I will update when I find out.
 - CSV of courses (or JSON?)
 - CLI Arguments
   -  Search term
   - Replace term

#### Destination of Outputs
---
The outputs will go directly into Canvas in the quizzes' question sections, and the program will be handed back to Josh. It will also be benificial to output a text file report of which courses recieved change and any changes that were made.

#### Definition of Outputs
---
Hopefully the only changes that will occur to Canvas is a replacement of the string mentioned above. There should be no other modifications to the courses.

For the text file I simply mention whether a course was changed if successfully and what it changed to. If it wasn't changed, the reason why.
<!-- #### General Requirements -->

#### User Interface Type: CLI with args (search and replace)

# Communication Plan

### Timeline
- [x] Finish Design (Monday (3/20))
- [x] Build program to find and replace (Tuesday(3/21))
- [ ] Update with input courses (Wednesday(3/22))
- [ ] Run implementation to fix courses, return to Josh (Wednesday(3/22))

### Best Mode of Contact
with Josh through Slack or in person

### Next Meeting
When the project is completed

### Action Items

#### TechOps
Update with inputs when cameron gives them, and run.

#### Stakeholder
Nothing

-----

#### *Approved By: Levi Stum*
#### *Approval Date: May 20, 2019*