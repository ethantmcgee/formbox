# Protocol Buffers

Protobuf serves many useful functions.  It allows a standardized mechanism for
generating classes and enums in multiple different languages including 
TypeScript and Python, the core languages of this project.  This folder contains
the proto definitions used to generate the data transfer objects used for 
communication between the frontend and backend.

## Setup

You will need to have [Python 3.12](https://www.python.org/) and 
[Node 20 LTS](https://nodejs.org/en) installed.

To install the required dependencies execute (in this directory):

```shell
npm install
pip3 install -r requirements.txt
```

## Generation

Generation of shared assets can be done via the provided script:

```shell
bash generate.sh
```