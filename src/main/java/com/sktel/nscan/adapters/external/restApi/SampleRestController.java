package com.sktel.nscan.adapters.external.restApi;



import com.sktel.nscan.common.dto.ResponseDTO;
import com.sktel.nscan.domain.sample.dto.SampleDTO;
import com.sktel.nscan.port.service.sample.SampleService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value="/api/sample/rest")
public class SampleRestController {

    private final SampleService sampleService;

    /*
    @Operation(summary = "list", description = "list api example")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @GetMapping(value="/")
    public ResponseEntity<List<SampleDTO>> list(){
        log.info("sample list");
        List<SampleDTO> sampleDTOList=new ArrayList<>();
        SampleDTO sampleDTO= new SampleDTO();
        sampleDTO.setSeq(1);
        sampleDTO.setTitle("득1");
        sampleDTO.setContent("Spring boot start 1");
        sampleDTO.setCreNm("deuk1");
        sampleDTO.setCreDt(new Date());
        sampleDTOList.add(sampleDTO);

        sampleDTO= new SampleDTO();
        sampleDTO.setSeq(2);
        sampleDTO.setTitle("득2");
        sampleDTO.setContent("Spring boot start 2");
        sampleDTO.setCreNm("deuk2");
        sampleDTO.setCreDt(new Date());
        sampleDTOList.add(sampleDTO);

        ResponseEntity<List<SampleDTO>> entity = new ResponseEntity<>(sampleDTOList, HttpStatus.OK);
        return entity;
    }

    @Operation(summary = "register", description = "register api example")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @RequestMapping(value="/", method = RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody SampleDTO sampleDTO){
        log.info("sample register");
        ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        return entity;
    }

    @Operation(summary = "read", description = "read api example")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @GetMapping(value="/{seq}")
    public ResponseEntity<SampleDTO> read(@PathVariable("seq") int seq){
        log.info("sample read");
        SampleDTO sampleDTO= new SampleDTO();

        sampleDTO.setSeq(1);
        sampleDTO.setTitle("득1");
        sampleDTO.setContent("Spring boot start 1");
        sampleDTO.setCreNm("deuk1");
        sampleDTO.setCreDt(new Date());

        ResponseEntity<SampleDTO> entity = new ResponseEntity<>(sampleDTO, HttpStatus.OK);
        return entity;
    }

    @Operation(summary = "remove", description = "remove api example")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @DeleteMapping(value="/{seq}")
    public ResponseEntity<String> remove(@PathVariable("seq") int seq){
        log.info("sample remove");
        ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        return entity;
    }

    @Operation(summary = "modify", description = "modify api example")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @PutMapping(value="/{seq}")
    public ResponseEntity<String> modify(@PathVariable("seq") int seq, @RequestBody SampleDTO sampleDTO){
        log.info("sample modify");
        ResponseEntity<String> entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        return entity;
    }
     */

    @ApiOperation(value = "조회", httpMethod = "GET", notes = "전체 고객 정보 조회 API.")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @GetMapping
    public ResponseEntity<Object> getAllSampleList(){
        return new ResponseEntity<>(new ResponseDTO(sampleService.getAllSampleList()), HttpStatus.OK);
    }

    @ApiOperation(value = "조회 단건 ", httpMethod = "GET", notes = "전체 고객 정보 조회 단건 API.")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @GetMapping(value="/{seq}")
    public ResponseEntity<Object> getSample(@PathVariable long seq) {
        SampleDTO sampleDTO = sampleService.getSample(seq);
        return new ResponseEntity<>(new ResponseDTO(sampleDTO), HttpStatus.OK);
    }

    @ApiOperation(value = "추가 ", httpMethod = "POST", notes = "추가 API.")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @PostMapping
    public ResponseEntity<Object> insertSample(@RequestBody SampleDTO sampleDTO){
        sampleService.insertSample(sampleDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "수정", httpMethod = "PUT", notes = "전체 고객 정보 수 API.")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @PutMapping
    public ResponseEntity<Object> updateCustomer(@RequestBody SampleDTO sampleDTO){
        sampleService.updateCustomer(sampleDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "삭제 ", httpMethod = "DELETE", notes = "전체 고객 정보 삭제 API.")
    @ApiResponses({@ApiResponse(code=200,message="성공"), @ApiResponse(code=400,message="잘못된 요청"), @ApiResponse(code=500,message="서버에러")})
    @DeleteMapping(value="/{seq}")
    public ResponseEntity<Object> deleteCustomer(@PathVariable long seq){
        sampleService.deleteCustomer(seq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
