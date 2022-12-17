import { createContext, useEffect, useState } from 'react';
import post from '../../common/framework';

const getCompilerId = (language) => {
  const compilerId = {
    BASH: 'BASH',
    BASIC: 3,
    C: 'C',
    'C#': 'CS',
    'C++': 'CPP14',
    'CLANG C': 75,
    'CLANG CPP': 76,
    CLOJURE: 18,
    COBOL: 77,
    CRYSTAL: 19,
    D: 56,
    ELIXIR: 57,
    ERLANG: 58,
    EXE: 44,
    'F#': 87,
    FORTRAN: 59,
    GO: 'GO',
    GROOVY: 88,
    HASKELL: 23,
    INSECT: 25,
    JAVA: 'JAVA',
    'JAVA 8': 'JAVA8',
    JAVASCRIPT: 'JAVASCRIPT',
    KOTLIN: 78,
    LUA: 64,
    NASM: 45,
    'OBJECTIVE C': 79,
    OCAML: 31,
    OCTAVE: 32,
    PASCAL: 33,
    PERL: 'PERL',
    PHP: 68,
    PROLOG: 69,
    'PYTHON 2': 'PY2',
    'PYTHON 3': 71,
    R: 80,
    RUBY: 'RUBY',
    RUST: 42,
    SBCL: 55,
    SCALA: 81,
    SQLITE: 82,
    SWIFT: 83,
    TYPESCRIPT: 74,
    VBNC: 84,
    c: 'C',
    cpp: 'CPP14',
    cs: 'CS',
    go: 'GO',
    java: 'JAVA',
    java8: 'JAVA8',
    java_en: 'JAVA',
    java_telugu: 'JAVA',
    javascript: 'JAVASCRIPT',
    javascript_en: 'JAVASCRIPT',
    js: 'JAVASCRIPT',
    m: 'OBJC',
    php: 'PHP',
    pl: 'PERL',
    py: 'PY2',
    py3: 'PY3',
    python: 'PY3',
    python_ar: 'PY3',
    python_en: 'PY3',
    python_hi: 'PY3',
    rb: 'RUBY',
    scala: 'SCALA',
    sh: 'BASH',
  };
  return compilerId[language];
};

const getLanguageId = (lang) => {
  const valueList = {
    BASH: 'bash',
    BASIC: 'basic',
    C: 'c',
    CLOJURE: 'clojure',
    CRYSTAL: 'crystal',
    'C++': 'cpp',
    'C#': 'csharp',
    ELIXIR: 'elixir',
    ERLANG: 'erlang',
    GO: 'go',
    HASKELL: 'haskell',
    INSECT: 'insect',
    JAVA: 'java',
    'JAVA 8': 'java8',
    JAVASCRIPT: 'javascript',
    OCAML: 'ocaml',
    OCTAVE: 'octave',
    PASCAL: 'pascal',
    'PYTHON 2': 'python',
    'PYTHON 3': 'python3',
    RUBY: 'ruby',
    RUST: 'rust',
    'OBJECTIVE C': 'objectivec',
    PHP: 'php',
    SCALA: 'scala',
    NASM: 'nasm',
    'CLANG C': 'clangc',
    'CLANG CPP': 'clangcpp',
    COBOL: 'cobol',
    SBCL: 'sbcl',
    D: 'd',
    'F#': 'fsharp',
    FORTRAN: 'fortran',
    GROOVY: 'groovy',
    KOTLIN: 'kotlin',
    LUA: 'lua',
    PROLOG: 'prolog',
    R: 'r',
    SQLITE: 'sqlite',
    SWIFT: 'swift',
    TYPESCRIPT: 'typescript',
    VBNC: 'vbnc',
  };

  const modeList = {
    bash: 'sh',
    c: 'c_cpp',
    clojure: 'clojure',
    crystal: 'crystal',
    cpp: 'c_cpp',
    csharp: 'csharp',
    elixir: 'elixir',
    erlang: 'erlang',
    go: 'golang',
    haskell: 'haskell',
    java: 'java',
    java8: 'java',
    javascript: 'javascript',
    ocaml: 'ocaml',
    octave: 'objectivec',
    pascal: 'pascal',
    python: 'python',
    python3: 'python',
    ruby: 'ruby',
    rust: 'rust',
    objectivec: 'objectivec',
    php: 'php',
    scala: 'scala',
    nasm: 'nasm',
    clangc: 'c_cpp',
    clangcpp: 'c_cpp',
    cobol: 'cobol',
    sbcl: 'lisp',
    d: 'd',
    fsharp: 'fsharp',
    fortran: 'fortran',
    groovy: 'groovy',
    kotlin: 'kotlin',
    lua: 'lua',
    prolog: 'prolog',
    r: 'r',
    sqlite: 'sql',
    swift: 'swift',
    typescript: 'typescript',
    vbnc: 'vbscript',
  };
  const langVal = valueList[lang];
  return modeList[langVal];
};

const getTempleteData = (language) => {
  const templateData = {
    BASH: '#A Simple Hello World Program\necho "Hello World"\n\n#Getting input via STDIN\nread userInput\necho "Input provided is: $userInput"',
    C: '#include <stdio.h>\nint main(void) {\n    //A Simple Hello World\n    printf("hello, world\\n");\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    scanf("%d%s", &userIntInput, &userStringInput);\n    printf("The Integer and String Input provided is: %d, %s\\n", userIntInput, userStringInput);\n    return 0;\n}',
    'C++': '#include <iostream>\nusing namespace std;\nint main() {\n    //A Simple Hello World Program\n    cout << "Hello World" << endl;\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    cin >> userIntInput >> userStringInput;\n    cout << "The Integer and String Input is: " << userIntInput << ", " << userStringInput << endl;\n    return 0;\n}',
    'C#': 'public class Hello {\n    public static void Main() {\n        //A Simple Hello World Program\n        System.Console.WriteLine("hello, world");\n        \n        //Getting input via STDIN\n        string userInput = System.Console.ReadLine();\n        System.Console.WriteLine("The Input Provided is: " + userInput);\n    }\n}',
    GO: 'package main\n\nimport "fmt"\n\nfunc main() {\n    //A Simple Hello World Program\n    fmt.Println("hello, world")\n    \n    //Getting input via STDIN\n    var userInput string\n    fmt.Scanln(&userInput)\n    fmt.Println("The Input Provided is: " + userInput)\n}',
    JAVA: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        //A Simple Hello World\n        System.out.println("hello, world");\n        \n        //Getting input via STDIN\n        Scanner obj = new Scanner(System.in);\n        String userInput = obj.next();\n        System.out.println("The Input Provided is: " + userInput);\n    }\n}',
    'JAVA 8': 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        //A Simple Hello World\n        System.out.println("hello, world");\n        \n        //Getting input via STDIN\n        Scanner obj = new Scanner(System.in);\n        String userInput = obj.next();\n        System.out.println("The Input Provided is: " + userInput);\n    }\n}',
    JAVASCRIPT: '// Getting input via STDIN\nconst readline = require("readline");\n\nconst inp = readline.createInterface({\n  input: process.stdin\n});\n\nconst userInput = [];\n\ninp.on("line", (data) => {\n  userInput.push(data);\n});\n\ninp.on("close", () => {\n  //start-here\n  //Your code goes here … replace the below line with your code logic \n\n  console.log(userInput);\n\n  //end-here\n});',
    'OBJECTIVE C': '#import <Foundation/Foundation.h>\n\nint main() {\n    @autoreleasepool {\n        //A Simple hello world\n        printf("Hello World\\n");\n\n        //Getting input via STDIN \n        char name[10];\n        scanf("%s", name);\n        NSString *message = [NSString stringWithFormat:@"%s\\n", name];\n        printf("%s", message.UTF8String);\n    }\n    return 0;\n}\n',
    PERL: '#!/usr/bin/perl \n\n# Modules used \nuse strict; \nuse warnings; \n\n# Print function \nprint("Hello World"); \n',
    PHP: '<?php\n// A Simple Hello World\necho "Hello World!\\n";\n\n//Getting input via STDIN\n$input = fopen("php://stdin", "r");\n$inputs = [];\nwhile ($line = fgets($input)) {\n  $inputs[] = $line;\n}\nfclose($input);\n\necho json_encode($inputs);\n?>',
    'PYTHON 2': '#A Simple Hello World\nprint "Hello World"\n\n#Getting input via STDIN\nuserInput = raw_input()\nprint "The Input Provided is: " + userInput',
    'PYTHON 3': '#A Simple Hello World\nprint("Hello World")\n\n#Getting input via STDIN\nuserInput = input()\nprint("The Input Provided is: " + userInput)',
    RUBY: '#A Simple Hello World\nputs "hello, world"\n\n#Getting input via STDIN\nuserInput = gets\nputs "The Input Provided is: " + userInput',
    SCALA: 'object Main {\n    def main(args: Array[String]) = {\n        // A simple hello world\n        println("Hello World")\n\n        // Getting input via STDIN \n        val name = scala.io.StdIn.readLine()\n        println(name)\n    }\n}\n',
    BASIC: '\'A Simple Hello World Program\nPRINT "hello, world"\n\n\'Getting input via STDIN\nDim userInput As String\nINPUT userInput\nPRINT "Input Provided is "; userInput',
    CLOJURE: ';A Simple Hello World Program\n(println "hello, world")\n\n;Getting input via STDIN\n(def userInput (read-line))\n(println "The Input Provided is: "userInput)',
    CRYSTAL: '#A Simple Hello World\nputs "hello, world"\n\n#Getting input via STDIN\nuserInput = gets\nputs "The Input Provided is: #{userInput}"',
    ELIXIR: '#A Simple Hello World\nIO.puts "hello, world"\n\n#Getting input via STDIN\nuserInput = IO.read(:stdio, :line)\nIO.puts "The Input provided is: " <> userInput\n',
    ERLANG: 'main(_) ->\n    %% A Simple Hello World\n    io:fwrite("hello, world\\n").\n    \n    %% Getting input via STDIN. Uncomment the below code to use it.\n    %% {ok, [UserInput]} = io:fread("", "~s"),\n    %% io:fwrite("The Input Provided is: ~s", [UserInput]).',
    HASKELL: 'main = do\n    -- A Simple Hello World\n    putStrLn "Hello World"\n    \n    -- Getting input from STDIN\n    userInput <- getLine\n    putStrLn ("The Input provided is: " ++ userInput)  ',
    INSECT: '2 min + 30 s',
    OCAML: '(* A Simple Hello World *)\nprint_endline "hello, world";\n\n(* Getting input via STDIN *)\nlet n = read_line () in\nprint_string "The Input Provided is: ";\nprint_string n;',
    OCTAVE: '%A Simple Hello World\nprintf("hello, world\\n");\n\n%Getting input via STDIN\nx = scanf(\'%s\', [1]);\nprintf("The Input Provided is: %s", x);',
    PASCAL: "program Hello;\nvar userInput: string;\nbegin\n    // A Simple Hello World\n    writeln ('hello, world');\n    \n    //Getting Input Via STDIN\n    readln(userInput);\n    writeln('The Input Provide is: ', userInput)\nend.",
    RUST: 'fn main() {\n    //A Simple Hello World\n    println!("hello, world");\n    \n    //Getting input via STDIN\n    let mut userInput = String::new();\n    std::io::stdin().read_line(&mut userInput).unwrap();\n    println!("The Input Provided is: {}", userInput);\n}',
    NASM: '; A Simple Hello World\nsection  .text\n    global _start\n\n_start:\n\n    xor  eax, eax\n    lea edx, [rax+len]\n    mov al, 1\n    mov  esi, msg\n    mov edi, eax\n    syscall\n\n    xor  edi, edi\n    lea eax, [rdi+60]\n    syscall\n\nsection .rodata\n\nmsg  db \'hello, world\', 0xa\nlen equ $ - msg\n\n; Getting input via STDIN - uncomment below before executing\n;    global _start\n;    section .text\n;_start:\n;print_prompt: \n;    mov rax, 1                  ; syscall write\n;    mov rdi, 1                  ; stdout\n;    mov rsi, prompt             ; prompt string\n;    mov rdx, 2                  ; 2 bytes\n;    syscall\n;    mov r8, 0                   ; length of buffer\n;    mov rsi, buffer             ; initialize buffer location\n;    mov r10, 0                  ; reset EOF flag\n;read_char:\n;    mov rax, 0                  ; syscall read\n;    mov rdi, 0                  ; stdin\n;    mov rdx, 1                  ; 1 byte\n;    syscall\n;    cmp rax, 0                  ; is EOF?\n;    jne non_eof                 ; jump to process char if not EOF (read=0)\n;    mov r10, 1                  ; flag EOF\n;    jmp print_word              ; print_word\n;non_eof:    \n;    inc r8                      ; increment buffer length\n;    inc rsi                     ; increment buffer location\n;    mov r9, 0                   ; clear r9\n;    mov r9b, byte [rsi-1]       ; move previous char into r9\n;    cmp r9, 10                  ; is it NEWLINE?\n;    je print_word               ; print the word if it is (including the NEWLINE)\n;    cmp r8, buffer_size         ; compare current length with buffer_size\n;    je print_word               ; print the word if it\'s equal to buffer_size\n;    jmp read_char               ; read next character\n;print_word:\n;    mov rax, 1                  ; syscall write\n;    mov rdi, 1                  ; stdout\n;    mov rsi, buffer             ; buffer\n;    mov rdx, r8                 ; length of word\n;    syscall\n;    cmp r10, 1                  ; is EOF?\n;    je exit\n;    jmp print_prompt\n;exit:   \n;    mov rax, 60                 ; system call for exit\n;    xor rdi, rdi                ; exit code 0\n;    syscall                     ; invoke operating system to exit\n;\n;    section .bss\n;buffer_size equ 64    \n;buffer:\n;    resb buffer_size            ; reserve a 64-byte buffer\n; \n;    section .data\n;prompt:\n;    dw "> "\n',
    'CLANG C': '#include <stdio.h>\nint main(void) {\n    //A Simple Hello World\n    printf("hello, world\\n");\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    scanf("%d%s", &userIntInput, &userStringInput);\n    printf("The Integer and String Input provided is: %d, %s\\n", userIntInput, userStringInput);\n    return 0;\n}',
    'CLANG CPP': '#include <iostream>\nusing namespace std;\nint main() {\n    //A Simple Hello World Program\n    cout << "Hello World" << endl;\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    cin >> userIntInput >> userStringInput;\n    cout << "The Integer and String Input is: " << userIntInput << ", " << userStringInput << endl;\n    return 0;\n}',
    COBOL: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. MAIN.\nDATA DIVISION.\n   WORKING-STORAGE SECTION.\n   01 INPUT_STRING PIC X(15).\nPROCEDURE DIVISION.\n# A Simple Hello World\nDISPLAY "hello, world".\n# Getting input via STDIN\nACCEPT INPUT_STRING.\nDISPLAY INPUT_STRING.\nSTOP RUN.\n',
    SBCL: '; A Simple Hello World\n(print "Hello world!")\n\n; Getting input via STDIN\n(print (read))\n',
    D: 'import std.stdio;\n\nvoid main()\n{\n    // A Simple Hello World\n    writeln("Hello, World!");\n    \n    // Getting input via STDIN\n    string input;\n    input = readln;\n    writeln(input);\n}',
    'F#': '// A Simple Hello World\nprintfn "Hello World"\n\n// Getting input via STDIN\nlet input = System.Console.ReadLine()\nprintfn "%s" input',
    FORTRAN: 'program main\n    ! A Simple Hello World\n    character(100) :: userInput\n    \n    print *, "Hello World"\n    \n    ! Getting input via STDIN\n    read (*,*) userInput\n    write (*,*) userInput\nend',
    GROOVY: '// A Simple Hello World\nprintln "Hello World"\n\n// Getting input via STDIN\nfor (line in System.in.readLines()) {\n   println(line);\n}',
    LUA: '-- A Simple Hello World\nprint("Hello World")\n\n-- Getting input via STDIN\nlocal a = io.read()\nprint(a)',
    PROLOG: '% A Simple Hello World\n:- initialization(main).\nmain :- write(\'Hello World!\').',
    R: '# A Simple Hello World\ncat(\'Hello World\\n\')\n\n# Getting input via STDIN\nuserInput = readLines(file("stdin"))\ncat(userInput)',
    SQLITE: '-- A Simple Hello World\nCREATE TABLE hello(str varchar(20));\nINSERT INTO hello VALUES(\'Hello world!\');\nSELECT * FROM hello;',
    SWIFT: '// A Simple Hello World\nimport Foundation\nprint("Hello World")\n\n// Getting input via STDIN - uncomment after providing input\n// let userInput = readLine()\n// print("(userInput!)")',
    TYPESCRIPT: '// A Simple Hello World\nconsole.log("Hello World");',
    VBNC: 'Public Module Program\n   Public Sub Main()\n      \' A Simple Hello World\n      Console.WriteLine("Hello World")\n      \n      \' Getting input via STDIN\n      Dim userInput As String\n      userInput = Console.ReadLine()\n      Console.WriteLine(userInput)\n   End Sub\nEnd Module\n',
    KOTLIN: 'import java.util.*\nfun main() {\n    // A Simple Hello World Program\n    println("hello, world")\n    \n    // Getting input via STDIN\n    val sc = Scanner(System.`in`)\n    val input: String = sc.next()\n    println(input);\n}\n',
  };
  return templateData[language];
};

const useCodekata = ({ isPageMounted, virtualid }) => {
  const [codekataData, setCodekata] = useState({
    status: true,
    questionList: false,
    submisstion: false,
    questionObject: false,
  });

  const getCodekataQuestions = (virtualId = virtualid) => post({ type: 'fetchQuestion', virtualId }, 'codekata/').then((res) => {
    const parsedRes = JSON.parse(res);
    if (parsedRes.status === 'success' && isPageMounted.current) setCodekata(parsedRes);
  });

  const runCode = ({ lang, code, input }) => post({
    type: 'runCode', compilerId: getCompilerId(lang), code, input,
  }, 'codekata/').then((res) => {
    const parsedRes = JSON.parse(res);
    return parsedRes.compilationDetails;
  });

  const submitCode = ({ questionId, code, lang }) => post({
    type: 'submitQuestion', compilerId: getCompilerId(lang), code, questionId,
  }, 'codekata/').then((res) => {
    const parsedRes = JSON.parse(res);
    return parsedRes;
  });

  const availableLanguages = [
    'BASH',
    'BASIC',
    'C',
    'CLOJURE',
    'CRYSTAL',
    'C++',
    'C#',
    'ELIXIR',
    'ERLANG',
    'GO',
    'HASKELL',
    'INSECT',
    'JAVA',
    'JAVA 8',
    'JAVASCRIPT',
    'OCAML',
    'OCTAVE',
    'PASCAL',
    'PYTHON 2',
    'PYTHON 3',
    'RUBY',
    'RUST',
    'OBJECTIVE C',
    'PHP',
    'SCALA',
    'NASM',
    'CLANG C',
    'CLANG CPP',
    'COBOL',
    'SBCL',
    'D',
    'F#',
    'FORTRAN',
    'GROOVY',
    'KOTLIN',
    'LUA',
    'PROLOG',
    'R',
    'SQLITE',
    'SWIFT',
    'TYPESCRIPT',
    'VBNC',
  ];

  useEffect(() => {
    getCodekataQuestions();
  }, []);

  return {
    state: codekataData,
    setState: setCodekata,
    static: {
      getCodekataQuestions,
      availableLanguages,
      getTempleteData,
      getLanguageId,
      runCode,
      submitCode,
    },
  };
};

const CodekataContext = createContext();

export default useCodekata;

export {
  CodekataContext,
};
